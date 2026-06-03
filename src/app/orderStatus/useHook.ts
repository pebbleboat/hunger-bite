"use client";

import { getPlacedOrder } from "@/utils/orderSession";
import { formatPrice } from "@/utils/formatPrice";
import { getSelectedMenuPath } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { PlacedOrder } from "@/lib/types";

export function useHook() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    const placed = getPlacedOrder();
    if (!placed) {
      const menuHref = getSelectedMenuPath();
      router.replace(menuHref ?? "/select-outlet");
      return;
    }
    setOrder(placed);
    setReady(true);
  }, [router]);

  return {
    ready,
    order,
    formatPrice,
    cartCount: order?.cartLines.reduce((n, l) => n + l.quantity, 0) ?? 0,
  };
}
