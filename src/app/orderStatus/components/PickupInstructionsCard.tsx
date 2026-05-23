"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import { FiMaximize2, FiSmartphone } from "react-icons/fi";

const PickupInstructionsCard = () => {
  return (
    <CardWrapper className="border-gray-200 p-5 shadow-sm">
      <Text as="h2" size="lg" type="semibold" className="mb-4 text-brand-950">
        Pickup Instructions
      </Text>
      <ul className="space-y-4">
        <li className="flex gap-3">
          <FiMaximize2 className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
          <Text size="sm" variant="secondary" className="leading-relaxed">
            Use the side entrance on 5th Ave for rapid pickup lockers.
          </Text>
        </li>
        <li className="flex gap-3">
          <FiSmartphone className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
          <Text size="sm" variant="secondary" className="leading-relaxed">
            Scan the QR code on your receipt at the kiosk to unlock your order.
          </Text>
        </li>
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="!rounded-xl"
          btnName="View Receipt"
        />
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="!rounded-xl"
          btnName="Call Store"
        />
      </div>
    </CardWrapper>
  );
};

export default PickupInstructionsCard;
