"use client";

import Button from "@/shared/buttons/Button";
import Text from "@/shared/heading/Text";
import { FiCheckCircle } from "react-icons/fi";

type OrderTotalCardProps = {
  subtotal: number;
  tax: number;
  total: number;
  formatPrice: (amount: number) => string;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
};

const OrderTotalCard = ({
  subtotal,
  tax,
  total,
  formatPrice,
  isPlacingOrder,
  onPlaceOrder,
}: OrderTotalCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-brand-950 shadow-sm">
      <div className="p-5">
        <Text as="h2" size="lg" type="bold" variant="white" className="mb-4">
          Total
        </Text>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Text size="sm" className="text-brand-100">
              Subtotal
            </Text>
            <Text size="sm" type="medium" variant="white">
              {formatPrice(subtotal)}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text size="sm" className="text-brand-100">
              Tax (8%)
            </Text>
            <Text size="sm" type="medium" variant="white">
              {formatPrice(tax)}
            </Text>
          </div>
          <div className="my-3 border-t border-brand-800" />
          <div className="flex justify-between">
            <Text size="base" type="semibold" variant="white">
              Amount due
            </Text>
            <Text size="xl" type="bold" variant="white">
              {formatPrice(total)}
            </Text>
          </div>
        </div>

        <Button
          type="button"
          fullWidth
          size="lg"
          className="!mt-5 !rounded-xl !bg-white !text-brand-950 hover:!bg-gray-100"
          icon={<FiCheckCircle className="h-5 w-5 text-brand-950" />}
          btnName={isPlacingOrder ? "Placing order…" : "Place Order"}
          isLoading={isPlacingOrder}
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
        />

        <Text
          size="xs"
          className="mt-4 text-center leading-relaxed text-brand-200"
        >
          By placing your order, you agree to HungerBite&apos;s terms and
          conditions.
        </Text>
      </div>
    </div>
  );
};

export default OrderTotalCard;
