"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import CartLineItem from "@/shared/cart/CartLineItem";
import Text from "@/shared/heading/Text";
import type { CartLine } from "@/lib/types";
import Link from "next/link";
import { FiEdit2, FiShoppingBag } from "react-icons/fi";

type ItemsForReviewCardProps = {
  cartLines: CartLine[];
  formatPrice: (amount: number) => string;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
};

const ItemsForReviewCard = ({
  cartLines,
  formatPrice,
  onUpdateQuantity,
  onRemove,
}: ItemsForReviewCardProps) => {
  return (
    <CardWrapper className="border-gray-200 !p-0 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <FiShoppingBag className="h-5 w-5 text-brand-950" />
        <Text as="h2" size="lg" type="semibold" className="text-brand-950">
          Items for Review
        </Text>
      </div>

      <ul className="divide-y divide-gray-100 px-5">
        {cartLines.map((line) => (
          <CartLineItem
            key={line.item.id}
            line={line}
            formatPrice={formatPrice}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            className="py-4 first:pt-5 last:pb-5"
          />
        ))}
      </ul>

      <div className="border-t border-gray-100 px-5 py-4">
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800"
        >
          <FiEdit2 className="h-4 w-4" />
          <Text as="span" size="sm" type="medium" className="text-brand-700">
            Modify your order
          </Text>
        </Link>
      </div>
    </CardWrapper>
  );
};

export default ItemsForReviewCard;
