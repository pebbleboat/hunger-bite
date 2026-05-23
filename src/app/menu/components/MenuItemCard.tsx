"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Img from "@/shared/Img";
import Text from "@/shared/heading/Text";
import type { MenuItem } from "@/lib/types";
import { FiShoppingCart, FiStar } from "react-icons/fi";

type MenuItemCardProps = {
  item: MenuItem;
  formatPrice: (amount: number) => string;
  onAddToCart: (item: MenuItem) => void;
};

const MenuItemCard = ({
  item,
  formatPrice,
  onAddToCart,
}: MenuItemCardProps) => {
  return (
    <CardWrapper className="flex h-full flex-col overflow-hidden border-gray-200 !p-0 shadow-sm">
      <div className="relative h-40 w-full shrink-0">
        <Img
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {item.rating ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-teal-500 px-2 py-1 shadow-sm">
            <FiStar className="h-3.5 w-3.5 fill-white text-white" />
            <Text as="span" size="xs" type="semibold" variant="white">
              {item.rating.toFixed(1)}
            </Text>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Text
            as="h3"
            size="base"
            type="semibold"
            className="leading-snug text-brand-950"
          >
            {item.name}
          </Text>
          <Text
            as="span"
            size="base"
            type="bold"
            className="shrink-0 text-brand-950"
          >
            {formatPrice(item.price)}
          </Text>
        </div>
        <Text
          size="sm"
          variant="secondary"
          className="mb-4 line-clamp-2 flex-1 leading-relaxed"
        >
          {item.description}
        </Text>
        <Button
          type="button"
          fullWidth
          size="md"
          className="!rounded-xl !bg-brand-950 hover:!bg-brand-900"
          icon={<FiShoppingCart className="h-4 w-4" />}
          btnName="Add to Cart"
          onClick={() => onAddToCart(item)}
        />
      </div>
    </CardWrapper>
  );
};

export default MenuItemCard;
