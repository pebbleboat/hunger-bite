"use client";

import type { CartLine, MenuCategoryId, MenuItem, Outlet } from "@/lib/types";
import { showToast } from "@/shared/ToastMessage";
import { MOCK_MENU_ITEMS } from "@/utils/mockMenuItems";
import { getCart, persistCart } from "@/utils/cartSession";
import { formatPrice, TAX_RATE } from "@/utils/formatPrice";
import { getSelectedOutlet } from "@/utils/outletSession";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "main", label: "Main Dishes" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
  { id: "specials", label: "Specials" },
];

async function fetchMenuItems(_outletId: string): Promise<MenuItem[]> {
  return MOCK_MENU_ITEMS;
}

export function useHook() {
  const router = useRouter();
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryId>("all");
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const selected = getSelectedOutlet();
    if (!selected) {
      router.replace("/select-outlet");
      return;
    }
    setOutlet(selected);
    const savedCart = getCart();
    if (savedCart?.lines?.length) {
      setCartLines(savedCart.lines);
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    persistCart(cartLines);
  }, [cartLines, ready]);

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: queryKeys.menu.list(
      outlet?.id ?? "",
      activeCategory,
      search,
    ),
    queryFn: () => fetchMenuItems(outlet!.id),
    enabled: Boolean(outlet?.id),
  });

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
          item.description.toLowerCase().includes(q),
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
    setCartLines((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast({
      type: "success",
      title: "Added to cart",
      subtitle: item.name,
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartLines((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, quantity: line.quantity + delta }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartLines((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const handleReviewOrder = () => {
    if (cartLines.length === 0) return;
    persistCart(cartLines);
    router.push("/finish-order");
  };

  return {
    outlet,
    ready,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    categories: MENU_CATEGORIES,
    filteredItems,
    isLoading,
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
  };
}
