"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";

type ProfileDeactivateCardProps = {
  onDeactivate?: () => void;
};

const ProfileDeactivateCard = ({ onDeactivate }: ProfileDeactivateCardProps) => {
  return (
    <CardWrapper className="border-gray-200 border-t-4 border-t-red-500 bg-gray-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text as="span" size="base" type="bold" className="text-red-600">
            Deactivate Account
          </Text>
          <Text size="sm" variant="tertiary" className="mt-1 max-w-xl">
            Temporarily disable your profile and hide your information.
          </Text>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="md"
          btnName="Deactivate"
          onClick={onDeactivate}
          className="!rounded-lg !border-red-300 !text-red-600 hover:!bg-red-50"
        />
      </div>
    </CardWrapper>
  );
};

export default ProfileDeactivateCard;
