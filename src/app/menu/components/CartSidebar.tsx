"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import CartLineItem from "@/shared/cart/CartLineItem";
import Text from "@/shared/heading/Text";
import type { CartLine } from "@/lib/types";
import clsx from "clsx";
import {
  FiBookmark,
  FiClock,
  FiMapPin,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";

type CartSidebarProps = {
  cartLines: CartLine[];
  formatPrice: (amount: number) => string;
  subtotal: number;
  tax: number;
  total: number;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  onReviewOrder: () => void;
};

const SIDEBAR_NAV = [
  { id: "cart", icon: FiShoppingCart, label: "Cart" },
  { id: "history", icon: FiClock, label: "History" },
  { id: "saved", icon: FiBookmark, label: "Saved" },
  { id: "settings", icon: FiSettings, label: "Settings" },
] as const;

const CartSidebar = ({
  cartLines,
  formatPrice,
  subtotal,
  tax,
  total,
  onUpdateQuantity,
  onRemove,
  onReviewOrder,
}: CartSidebarProps) => {
  return (
    <CardWrapper className="flex h-full min-h-[calc(100vh-8rem)] flex-col border-gray-200 !p-0 shadow-sm lg:sticky lg:top-24">
      <div className="border-b border-gray-100 px-5 py-5">
        <Text as="h2" size="xl" type="bold" className="text-brand-950">
          Your Cart
        </Text>
        <div className="mt-2 flex items-center gap-1.5">
          <FiMapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <Text size="sm" variant="tertiary">
            Table 12 • Dine In
          </Text>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {cartLines.length === 0 ? (
          <Text size="sm" variant="secondary" className="py-8 text-center">
            Your cart is empty. Add items from the menu.
          </Text>
        ) : (
          <ul className="space-y-4">
            {cartLines.map((line) => (
              <CartLineItem
                key={line.item.id}
                line={line}
                size="sm"
                formatPrice={formatPrice}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
                className="border-b border-gray-50 pb-4 last:border-0"
              />
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Text size="sm" variant="secondary">
              Subtotal
            </Text>
            <Text size="sm" type="medium">
              {formatPrice(subtotal)}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text size="sm" variant="secondary">
              Tax (8%)
            </Text>
            <Text size="sm" type="medium">
              {formatPrice(tax)}
            </Text>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <Text size="base" type="bold" className="text-brand-950">
              Total
            </Text>
            <Text size="base" type="bold" className="text-brand-950">
              {formatPrice(total)}
            </Text>
          </div>
        </div>
        <Button
          type="button"
          fullWidth
          size="lg"
          className="!mt-4 !rounded-xl !bg-brand-950 hover:!bg-brand-900"
          btnName="Review Order"
          disabled={cartLines.length === 0}
          onClick={onReviewOrder}
        />
      </div>

      <div className="flex justify-around border-t border-gray-100 px-2 py-3">
        {SIDEBAR_NAV.map((nav) => {
          const Icon = nav.icon;
          const isActive = nav.id === "cart";
          return (
            <button
              key={nav.id}
              type="button"
              className="flex flex-col items-center gap-1 px-3 py-1"
              aria-label={nav.label}
            >
              <div
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  isActive ? "bg-brand-950 text-white" : "text-gray-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </button>
          );
        })}
      </div>
    </CardWrapper>
  );
};

export default CartSidebar;
