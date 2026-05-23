"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import type { Outlet } from "@/lib/types";
import { FiClock, FiUser, FiCoffee } from "react-icons/fi";

type OrderDetailsCardProps = {
  outlet: Outlet | null;
  displayName: string;
  displayEmail: string;
};

const OrderDetailsCard = ({
  outlet,
  displayName,
  displayEmail,
}: OrderDetailsCardProps) => {
  return (
    <CardWrapper className="border-gray-200 p-5 shadow-sm">
      <Text
        as="span"
        size="xxs"
        type="semibold"
        className="mb-4 block uppercase tracking-[0.1em] text-gray-500"
      >
        Order details
      </Text>

      <div className="space-y-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <FiCoffee className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <Text as="span" size="sm" type="semibold" className="text-brand-950">
              Dine-in • Table 12
            </Text>
            <Text size="sm" variant="tertiary" className="mt-0.5">
              {outlet?.name ?? "HungerBite Main Dining Hall"}
            </Text>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <FiClock className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <Text as="span" size="sm" type="semibold" className="text-brand-950">
              15–20 mins
            </Text>
            <Text size="sm" variant="tertiary" className="mt-0.5">
              Estimated preparation time
            </Text>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <FiUser className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <Text as="span" size="sm" type="semibold" className="text-brand-950">
              {displayName}
            </Text>
            <Text size="sm" variant="tertiary" className="mt-0.5">
              {displayEmail}
            </Text>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default OrderDetailsCard;
