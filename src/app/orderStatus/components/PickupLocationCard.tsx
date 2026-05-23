"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Img from "@/shared/Img";
import Text from "@/shared/heading/Text";
import { FiMapPin, FiNavigation } from "react-icons/fi";

type PickupLocationCardProps = {
  pickupLocation: string;
};

const PickupLocationCard = ({ pickupLocation }: PickupLocationCardProps) => {
  return (
    <CardWrapper className="overflow-hidden border-gray-200 !p-0 shadow-sm">
      <div className="relative h-44 w-full">
        <Img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
          alt="Pickup location map"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950 shadow-lg">
            <FiMapPin className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div>
          <Text size="xs" variant="tertiary">
            Pick-up location
          </Text>
          <Text as="span" size="sm" type="semibold" className="text-brand-950">
            {pickupLocation}
          </Text>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-brand-700 hover:bg-gray-50"
          aria-label="Open directions"
        >
          <FiNavigation className="h-4 w-4" />
        </button>
      </div>
    </CardWrapper>
  );
};

export default PickupLocationCard;
