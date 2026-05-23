"use client";

import Img from "@/shared/Img";
import Text, { TextProps } from "@/shared/heading/Text";
import type { CartLine } from "@/lib/types";
import clsx from "clsx";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export type CartLineItemSize = "sm" | "md";

const sizeStyles = {
  sm: {
    rootGap: "gap-3",
    image: "h-12 w-12",
    imageSizes: "48px",
    contentGap: "gap-2",
    nameSize: "sm" as TextProps["size"],
    priceSize: "sm" as TextProps["size"],
    qtySize: "xs" as TextProps["size"],
    counterBtn: "h-6 w-6 rounded-md",
    counterIcon: "h-3.5 w-3.5",
    counterGap: "gap-1.5 mt-1.5",
    trashIcon: "h-3.5 w-3.5",
  },
  md: {
    rootGap: "gap-4",
    image: "h-14 w-14",
    imageSizes: "56px",
    contentGap: "gap-3",
    nameSize: "base" as TextProps["size"],
    priceSize: "base" as TextProps["size"],
    qtySize: "sm" as TextProps["size"],
    counterBtn: "h-8 w-8 rounded-lg",
    counterIcon: "h-4 w-4",
    counterGap: "gap-2 mt-2",
    trashIcon: "h-4 w-4",
  },
};

export type CartLineItemProps = {
  line: CartLine;
  formatPrice: (amount: number) => string;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  className?: string;
  size?: CartLineItemSize;
};

const CartLineItem = ({
  line,
  formatPrice,
  onUpdateQuantity,
  onRemove,
  className,
  size = "md",
}: CartLineItemProps) => {
  const { item, quantity } = line;
  const s = sizeStyles[size];

  return (
    <li className={clsx("flex", s.rootGap, className)}>
      <div
        className={clsx(
          "relative shrink-0 overflow-hidden rounded-lg",
          s.image,
        )}
      >
        <Img
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes={s.imageSizes}
        />
      </div>

      <div className={clsx("flex min-w-0 flex-1", s.contentGap)}>
        <div className="min-w-0 flex-1">
          <Text
            as="span"
            size={s.nameSize}
            type="semibold"
            className="block truncate text-brand-950"
          >
            {item.name}
          </Text>
          <div className={clsx("flex items-center", s.counterGap)}>
            <button
              type="button"
              className={clsx(
                "flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50",
                s.counterBtn,
              )}
              onClick={() => onUpdateQuantity(item.id, -1)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              <FiMinus className={s.counterIcon} />
            </button>
            <Text
              as="span"
              size={s.qtySize}
              type="medium"
              className="min-w-[1.25rem] text-center text-brand-950"
            >
              {quantity}
            </Text>
            <button
              type="button"
              className={clsx(
                "flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50",
                s.counterBtn,
              )}
              onClick={() => onUpdateQuantity(item.id, 1)}
              aria-label={`Increase ${item.name} quantity`}
            >
              <FiPlus className={s.counterIcon} />
            </button>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-between self-stretch py-0.5">
          <Text
            as="span"
            size={s.priceSize}
            type="semibold"
            className="text-brand-950"
          >
            {formatPrice(item.price * quantity)}
          </Text>
          <button
            type="button"
            className="text-red-500 hover:text-red-600"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <FiTrash2 className={s.trashIcon} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartLineItem;
