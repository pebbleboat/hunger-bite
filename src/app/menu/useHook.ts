"use client";

import { apiErrorMessage } from "@/lib/apiConstant";
import { createOrder, getMenuItems } from "@/lib/apis";
import type {
  CartDraft,
  CartLine,
  CatalogMenuItemRecord,
  MenuCategoryId,
  MenuItem,
} from "@/lib/types";
import { showToast } from "@/shared/ToastMessage";
import { storageKeys } from "@/utils/enum";
import { formatPrice, TAX_RATE } from "@/utils/formatPrice";
import { getLocalItem, setLocalItem } from "@/utils/localstorage";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { menuPath } from "@/utils/routes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_MENU_ITEM_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

function isMenuItemAvailable(status?: string): boolean {
  const value = (status ?? "available").toLowerCase().replace(/\s+/g, "_");
  return value === "available";
}

function mapCatalogMenuItem(raw: CatalogMenuItemRecord): MenuItem {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    price: raw.price ?? 0,
    imageUrl: raw.image?.trim() || DEFAULT_MENU_ITEM_IMAGE,
    category: raw.category ?? "default",
    dietary: raw.dietary,
  };
}

function formatCategoryLabel(value: string): string {
  return value
    .split(/[_-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function useHook() {
  const router = useRouter();
  const params = useParams();
  const outletId = String(params.outletId ?? "");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("all");
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const savedCart = getLocalItem<CartDraft>(storageKeys.CART);
    setCartLines(savedCart?.lines ?? []);
  }, [outletId]);

  const {
    data: menuItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: queryKeys.menu.list(outletId ?? ""),
    queryFn: async () => {
      const data = await getMenuItems(outletId);
      if (!Array.isArray(data)) return [];
      return data
        .filter((item) => isMenuItemAvailable(item.status))
        .map(mapCatalogMenuItem);
    },
    enabled: Boolean(outletId),
  });

  const categories = useMemo(() => {
    const unique = Array.from(new Set(menuItems.map((item) => item.category)));
    return [
      { id: "all" as const, label: "All Items" },
      ...unique.map((id) => ({
        id,
        label: formatCategoryLabel(id),
      })),
    ];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    let list = [...menuItems];
    if (activeCategory !== "all") {
      list = list.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [menuItems, activeCategory, search]);

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

  const addToCart = (item: MenuItem) => {
    const existing = cartLines.find((line) => line.item.id === item.id);
    const next = existing
      ? cartLines.map((line) =>
          line.item.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        )
      : [...cartLines, { item, quantity: 1 }];
    setCartLines(next);
    setLocalItem(storageKeys.CART, { lines: next });
    showToast({
      type: "success",
      title: "Added to cart",
      subtitle: item.name,
    });
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
    setLocalItem(storageKeys.CART, { lines: next });
  };

  const removeFromCart = (itemId: string) => {
    const next = cartLines.filter((line) => line.item.id !== itemId);
    setCartLines(next);
    setLocalItem(storageKeys.CART, { lines: next });
  };

  const { mutate: reviewOrder, isPending: isReviewingOrder } = useMutation({
    mutationFn: () =>
      createOrder(outletId, {
        items: cartLines.map((line) => ({
          id: line.item.id,
          quantity: line.quantity,
        })),
      }),
    onSuccess: () => {
      setLocalItem(storageKeys.CART, { lines: cartLines });
      showToast({
        type: "success",
        title: "Order submitted",
        subtitle: "Continue to review your order details.",
      });
      router.push("/finish-order");
    },
    onError: (err) => {
      showToast({
        type: "error",
        title: apiErrorMessage(err, "Could not create order"),
      });
    },
  });

  const handleReviewOrder = () => {
    if (cartLines.length === 0 || isReviewingOrder) return;
    reviewOrder();
  };

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    isLoading,
    refetch,
    cartLines,
    addToCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    total,
    formatPrice,
    cartCount: cartLines.reduce((n, line) => n + line.quantity, 0),
    handleReviewOrder,
    isReviewingOrder,
  };
}
