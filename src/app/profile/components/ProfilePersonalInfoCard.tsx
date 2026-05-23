"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import type { UserProfile } from "@/lib/types";
import { FiEdit2, FiUser } from "react-icons/fi";

type ProfilePersonalInfoCardProps = {
  profile: UserProfile;
  onEdit?: () => void;
};

type ReadOnlyFieldProps = {
  label: string;
  value: string;
};

const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps) => (
  <div>
    <Text
      as="span"
      size="xxs"
      type="semibold"
      className="mb-2 block uppercase tracking-[0.1em] text-gray-500"
    >
      {label}
    </Text>
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <Text as="span" size="sm" type="medium" className="text-brand-950">
        {value}
      </Text>
    </div>
  </div>
);

const ProfilePersonalInfoCard = ({
  profile,
  onEdit,
}: ProfilePersonalInfoCardProps) => {
  return (
    <CardWrapper className="border-gray-200 p-5 shadow-sm md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <FiUser className="h-5 w-5 text-gray-600" />
          </div>
          <Text as="span" size="lg" type="bold" className="text-brand-950">
            Personal Information
          </Text>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          btnName="Edit"
          icon={<FiEdit2 className="h-4 w-4" />}
          onClick={onEdit}
          className="!rounded-lg"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ReadOnlyField label="Full Name" value={profile.fullName} />
        <ReadOnlyField label="Email Address" value={profile.email} />
        <ReadOnlyField label="Phone Number" value={profile.phone} />
        <ReadOnlyField
          label="Preferred Language"
          value={profile.preferredLanguage}
        />
      </div>
    </CardWrapper>
  );
};

export default ProfilePersonalInfoCard;
