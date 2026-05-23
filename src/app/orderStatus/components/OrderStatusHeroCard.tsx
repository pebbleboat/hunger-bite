"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import type { PlacedOrder } from "@/lib/types";
import { FiMessageCircle, FiCoffee } from "react-icons/fi";
import OrderStatusStepper from "./OrderStatusStepper";

type OrderStatusHeroCardProps = {
  order: PlacedOrder;
};

const OrderStatusHeroCard = ({ order }: OrderStatusHeroCardProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Text
            as="span"
            size="xxs"
            type="semibold"
            className="uppercase tracking-[0.12em] text-gray-500"
          >
            Order #{order.orderNumber}
          </Text>
          <Text
            as="h1"
            size="2xl"
            type="bold"
            className="mt-2 text-brand-950 md:text-3xl"
          >
            {order.headline}
          </Text>
        </div>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-3 py-1.5">
            <FiCoffee className="h-4 w-4 text-white" />
            <Text as="span" size="xs" type="bold" className="text-white">
              {order.statusLabel}
            </Text>
          </div>
        </div>
      </div>
      <CardWrapper className="border-gray-200 p-5 shadow-sm md:p-6">
        <OrderStatusStepper steps={order.steps} />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-gray-100 pt-6">
          <div className="flex flex-wrap gap-10">
            <div>
              <Text
                as="span"
                size="xxs"
                type="semibold"
                className="uppercase tracking-[0.1em] text-gray-500"
              >
                Estimated arrival
              </Text>
              <Text
                as="span"
                size="xl"
                type="bold"
                className="mt-1 block text-brand-950"
              >
                {order.estimatedArrival}
              </Text>
            </div>
            <div>
              <Text
                as="span"
                size="xxs"
                type="semibold"
                className="uppercase tracking-[0.1em] text-gray-500"
              >
                Current wait
              </Text>
              <Text
                as="span"
                size="xl"
                type="bold"
                className="mt-1 block text-teal-600"
              >
                {order.currentWait}
              </Text>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            className="!rounded-xl !bg-brand-950 hover:!bg-brand-900"
            icon={<FiMessageCircle className="h-5 w-5" />}
            btnName="Need Help?"
          />
        </div>
      </CardWrapper>
    </>
  );
};

export default OrderStatusHeroCard;
