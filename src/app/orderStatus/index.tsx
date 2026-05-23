"use client";

import HungerBiteNavbar from "@/components/hungerBite/HungerBiteNavbar";
import Loader from "@/shared/Loader";
import { useState } from "react";
import OrderStatusCartSidebar from "./components/OrderStatusCartSidebar";
import OrderStatusHeroCard from "./components/OrderStatusHeroCard";
import PickupInstructionsCard from "./components/PickupInstructionsCard";
import PickupLocationCard from "./components/PickupLocationCard";
import { useHook } from "./useHook";

export function OrderStatus() {
  const [search, setSearch] = useState("");
  const { ready, order, formatPrice, cartCount } = useHook();

  if (!ready || !order) {
    return <Loader className="h-screen" size={28} variant="full-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HungerBiteNavbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Track another order..."
        cartCount={cartCount}
        activeNav="orders"
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <OrderStatusHeroCard order={order} />
            <div className="grid gap-5 md:grid-cols-2">
              <PickupLocationCard pickupLocation={order.pickupLocation} />
              <PickupInstructionsCard />
            </div>
          </div>

          <aside className="w-full shrink-0 lg:w-[380px]">
            <OrderStatusCartSidebar order={order} formatPrice={formatPrice} />
          </aside>
        </div>
      </div>
    </div>
  );
}
