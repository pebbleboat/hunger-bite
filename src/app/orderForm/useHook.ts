import {
  createOrder,
  getOutletOrders,
} from "@/lib/apis";
import { apiErrorMessage, getServiceBaseUrl } from "@/lib/apiConstant";
import { MicroService } from "@/utils/enum";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState, type FormEvent } from "react";
import { OrderRow } from "@/lib/types";

export function useHook() {
  const queryClient = useQueryClient();
  const [outletId, setOutletId] = useState("1");
  const [item, setItem] = useState("Coffee");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [lastCreated, setLastCreated] = useState<OrderRow | null>(null);

  const {
    data: orders = [],
    error: ordersError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: queryKeys.orders.outlet(outletId),
    queryFn: () => getOutletOrders(outletId),
    enabled: Boolean(outletId?.trim()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: { item: string; quantity: number }) =>
      createOrder(outletId, body),
    onSuccess: (created) => {
      setLastCreated(created);
      setMessage(`Created order ${created._id}`);
      void queryClient.invalidateQueries({
        queryKey: queryKeys.orders.outlet(outletId),
      });
    },
    onError: (err) => {
      setMessage(apiErrorMessage(err, "Request failed"));
    },
  });

  const listError = ordersError
    ? apiErrorMessage(ordersError, "Failed to load orders")
    : null;

  const loadOrders = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessage(null);
      mutate({
        item: item.trim(),
        quantity: Number(quantity),
      });
    },
    [item, quantity, mutate],
  );

  return {
    outletId,
    setOutletId,
    item,
    setItem,
    quantity,
    setQuantity,
    busy: isPending,
    message,
    lastCreated,
    orders,
    listError,
    loadOrders,
    handleSubmit,
    orderApiBaseUrl: getServiceBaseUrl(MicroService.ORDER),
    isOrdersLoading: isLoading || isFetching,
  };
}
