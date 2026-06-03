"use client";

import type { AuthUser } from "@/utils/authSession";
import {
  buildPlacedOrderFromCart,
  persistPlacedOrder,
} from "@/utils/orderSession";
import { storageKeys } from "@/utils/enum";
import { formatPrice, TAX_RATE } from "@/utils/formatPrice";
import { getLocalItem, removeLocalItem, setLocalItem } from "@/utils/localstorage";
import { getSelectedOutlet } from "@/utils/outletSession";
import { menuPath } from "@/utils/routes";
import { showToast } from "@/shared/ToastMessage";
import { apiErrorMessage } from "@/lib/apiConstant";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CartDraft, CartLine, Outlet } from "@/lib/types";

export function useHook() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [instructions, setInstructions] = useState("");

  const user = getLocalItem<AuthUser>(storageKeys.CURRENT_USER);
  const displayName =
    user?.name ?? user?.email?.split("@")[0] ?? "Guest";
  const displayEmail = user?.email ?? "—";

  useEffect(() => {
    const selectedOutlet = getSelectedOutlet();
    const cart = getLocalItem<CartDraft>(storageKeys.CART);
    if (!selectedOutlet) {
      router.replace("/select-outlet");
      return;
    }
    if (!cart?.lines?.length) {
      router.replace(menuPath(selectedOutlet.id));
      return;
    }
    setOutlet(selectedOutlet);
    setCartLines(cart.lines);
    setInstructions(cart.instructions ?? "");
    setReady(true);
  }, [router]);

  const subtotal = useMemo(
    () =>
      cartLines.reduce(
        (sum, line) => sum + line.item.price * line.quantity,
        0,
      ),
    [cartLines],
  );
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  useEffect(() => {
    if (!ready) return;
    if (cartLines.length === 0 && outlet?.id) {
      router.replace(menuPath(outlet.id));
    }
  }, [cartLines.length, ready, router, outlet?.id]);

  const handleInstructionsChange = (value: string) => {
    setInstructions(value);
    setLocalItem(storageKeys.CART, { lines: cartLines, instructions: value });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const next = cartLines
      .map((line) =>
        line.item.id === itemId
          ? { ...line, quantity: line.quantity + delta }
          : line,
      )
      .filter((line) => line.quantity > 0);
    setCartLines(next);
    setLocalItem(storageKeys.CART, { lines: next, instructions });
  };

  const removeFromCart = (itemId: string) => {
    const next = cartLines.filter((line) => line.item.id !== itemId);
    setCartLines(next);
    setLocalItem(storageKeys.CART, { lines: next, instructions });
  };

  const { mutate: placeOrder, isPending: isPlacingOrder } = useMutation({
    mutationFn: async () => {
      if (!outlet) throw new Error("No outlet selected");
      setLocalItem(storageKeys.CART, { lines: cartLines, instructions });
      const placed = buildPlacedOrderFromCart(
        cartLines,
        outlet,
        instructions,
      );
      persistPlacedOrder(placed);
      removeLocalItem(storageKeys.CART);
      return placed;
    },
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Order placed",
        subtitle: "Your order has been sent to the kitchen.",
      });
      router.push("/order-status");
    },
    onError: (err) => {
      showToast({
        type: "error",
        title: apiErrorMessage(err, "Could not place order"),
      });
    },
  });

  return {
    ready,
    outlet,
    cartLines,
    instructions,
    handleInstructionsChange,
    subtotal,
    tax,
    total,
    formatPrice,
    displayName,
    displayEmail,
    placeOrder,
    isPlacingOrder,
    cartCount: cartLines.reduce((n, l) => n + l.quantity, 0),
    updateQuantity,
    removeFromCart,
  };
}
