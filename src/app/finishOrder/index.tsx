"use client";

import HungerBiteNavbar from "@/components/hungerBite/HungerBiteNavbar";
import Loader from "@/shared/Loader";
import Text from "@/shared/heading/Text";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ItemsForReviewCard from "./components/ItemsForReviewCard";
import OrderDetailsCard from "./components/OrderDetailsCard";
import OrderInstructionsCard from "./components/OrderInstructionsCard";
import OrderTotalCard from "./components/OrderTotalCard";
import { useHook } from "./useHook";

export function FinishOrder() {
  const [search, setSearch] = useState("");
  const {
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
    cartCount,
    updateQuantity,
    removeFromCart,
  } = useHook();

  if (!ready) {
    return <Loader className="h-screen" size={28} variant="full-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HungerBiteNavbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search orders..."
        cartCount={cartCount}
        activeNav="orders"
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-brand-950 hover:bg-white"
            aria-label="Back to menu"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <Text as="h1" size="3xl" type="bold" className="text-brand-950">
            Review Your Order
          </Text>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <ItemsForReviewCard
              cartLines={cartLines}
              formatPrice={formatPrice}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
            <OrderInstructionsCard
              value={instructions}
              onChange={handleInstructionsChange}
            />
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[380px]">
            <OrderDetailsCard
              outlet={outlet}
              displayName={displayName}
              displayEmail={displayEmail}
            />
            <OrderTotalCard
              subtotal={subtotal}
              tax={tax}
              total={total}
              formatPrice={formatPrice}
              isPlacingOrder={isPlacingOrder}
              onPlaceOrder={() => placeOrder()}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
