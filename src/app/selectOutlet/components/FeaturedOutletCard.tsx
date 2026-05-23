"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Img from "@/shared/Img";
import Text from "@/shared/heading/Text";
import type { Outlet } from "@/lib/types";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";

type FeaturedOutletCardProps = {
  outlet: Outlet;
  onSelect: (outlet: Outlet) => void;
  isSelecting?: boolean;
};

const FeaturedOutletCard = ({
  outlet,
  onSelect,
  isSelecting,
}: FeaturedOutletCardProps) => {
  return (
    <CardWrapper className="border-gray-200 md:col-span-2 !p-0">
      <div className="flex min-h-[240px] h-full flex-col md:flex-row md:items-stretch">
        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-l-2xl md:h-auto md:min-h-[240px] md:w-[46%]">
          <Img
            src={outlet.imageUrl}
            alt={outlet.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 46vw"
          />
          <Text
            as="span"
            size="xs"
            type="semibold"
            variant="white"
            className="absolute left-3 top-3 rounded-full bg-teal-500 px-3 py-1 shadow-sm"
          >
            Featured
          </Text>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 p-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <Text
                as="h2"
                size="2xl"
                type="bold"
                className="leading-tight text-brand-950"
              >
                {outlet.name}
              </Text>
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1">
                <FiStar className="h-4 w-4 fill-teal-600 text-teal-600" />
                <Text
                  as="span"
                  size="sm"
                  type="semibold"
                  className="text-teal-700"
                >
                  {outlet.rating.toFixed(1)}
                </Text>
              </div>
            </div>

            <Text
              size="sm"
              variant="secondary"
              className="leading-relaxed text-gray-600"
            >
              {outlet.description}
            </Text>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5">
                <FiMapPin className="h-4 w-4 shrink-0 text-gray-400" />
                <Text size="sm" variant="tertiary">
                  {outlet.distanceMiles} miles
                </Text>
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock className="h-4 w-4 shrink-0 text-gray-400" />
                <Text size="sm" variant="tertiary">
                  Open until {outlet.openUntil}
                </Text>
              </div>
            </div>
          </div>

          <Button
            type="button"
            fullWidth
            size="lg"
            className="!h-12 !rounded-xl !bg-brand-950 !text-base hover:!bg-brand-900"
            btnName={isSelecting ? "Selecting…" : "Select Location"}
            isLoading={isSelecting}
            disabled={isSelecting}
            onClick={() => onSelect(outlet)}
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default FeaturedOutletCard;
