"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Img from "@/shared/Img";
import Text from "@/shared/heading/Text";
import type { Outlet } from "@/lib/types";
import { FiChevronRight, FiStar } from "react-icons/fi";

type OutletCardProps = {
  outlet: Outlet;
  onSelect: (outlet: Outlet) => void;
};

const OutletCard = ({ outlet, onSelect }: OutletCardProps) => {
  return (
    <CardWrapper className="flex h-full flex-col overflow-hidden border-gray-200 !p-0">
      <div className="relative h-44 w-full shrink-0">
        <Img
          src={outlet.imageUrl}
          alt={outlet.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 backdrop-blur-sm">
          <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <Text as="span" size="xs" type="semibold">
            {outlet.rating.toFixed(1)}
          </Text>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Text as="h3" size="lg" type="semibold" className="mb-2 text-brand-950">
          {outlet.name}
        </Text>
        <Text
          size="sm"
          variant="secondary"
          className="mb-5 line-clamp-2 flex-1"
        >
          {outlet.description}
        </Text>
        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
          <Text size="sm" variant="tertiary">
            {outlet.distanceMiles} miles away
          </Text>
          <button
            type="button"
            onClick={() => onSelect(outlet)}
            className="inline-flex items-center gap-0.5 text-brand-700 hover:text-brand-800"
          >
            <Text
              as="span"
              size="sm"
              type="semibold"
              className="text-brand-700"
            >
              View Menu
            </Text>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default OutletCard;
