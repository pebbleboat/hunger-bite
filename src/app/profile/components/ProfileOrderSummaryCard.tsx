"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import type { UserProfile } from "@/lib/types";

type ProfileOrderSummaryCardProps = {
  profile: UserProfile;
};

const ProfileOrderSummaryCard = ({ profile }: ProfileOrderSummaryCardProps) => {
  return (
    <CardWrapper className="border-brand-100 bg-brand-50 p-5 shadow-sm">
      <Text
        as="span"
        size="xxs"
        type="semibold"
        className="block uppercase tracking-[0.12em] text-gray-500"
      >
        Order summary
      </Text>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" type="medium" variant="secondary">
            Active Orders
          </Text>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            <Text as="span" size="sm" type="bold" className="text-brand-950">
              {profile.activeOrders}
            </Text>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Text as="span" size="sm" type="medium" variant="secondary">
            Total Delivered
          </Text>
          <Text as="span" size="sm" type="bold" className="text-brand-950">
            {profile.totalDelivered}
          </Text>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProfileOrderSummaryCard;
