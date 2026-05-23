"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import { FiAlignLeft } from "react-icons/fi";

type OrderInstructionsCardProps = {
  value: string;
  onChange: (value: string) => void;
};

const OrderInstructionsCard = ({
  value,
  onChange,
}: OrderInstructionsCardProps) => {
  return (
    <CardWrapper className="border-gray-200 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FiAlignLeft className="h-5 w-5 text-brand-950" />
        <Text as="h2" size="lg" type="semibold" className="text-brand-950">
          General Order Instructions
        </Text>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add any specific delivery or dining instructions..."
        rows={4}
        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
      />
    </CardWrapper>
  );
};

export default OrderInstructionsCard;
