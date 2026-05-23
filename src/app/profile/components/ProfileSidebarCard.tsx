"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import type { UserProfile } from "@/lib/types";
import type { ReactNode } from "react";
import { FiBell, FiChevronRight, FiShield } from "react-icons/fi";

type ProfileSidebarCardProps = {
  profile: UserProfile;
  onTrustClick?: () => void;
  onNotificationsClick?: () => void;
};

type SidebarLinkProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

const SidebarLink = ({ icon, label, onClick }: SidebarLinkProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3.5 text-left transition-colors hover:bg-gray-100"
  >
    <span className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
        {icon}
      </span>
      <Text as="span" size="sm" type="semibold" className="text-brand-950">
        {label}
      </Text>
    </span>
    <FiChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
  </button>
);

const ProfileSidebarCard = ({
  profile,
  onTrustClick,
  onNotificationsClick,
}: ProfileSidebarCardProps) => {
  return (
    <CardWrapper className="border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-950">
          <Text as="span" size="lg" type="bold" variant="white">
            {profile.initials}
          </Text>
        </div>
        <div>
          <Text as="span" size="lg" type="bold" className="text-brand-950">
            {profile.fullName}
          </Text>
          <Text
            as="span"
            size="xxs"
            type="semibold"
            className="mt-1 block uppercase tracking-[0.12em] text-gray-500"
          >
            Member since {profile.memberSince}
          </Text>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <SidebarLink
          icon={<FiShield className="h-[18px] w-[18px]" />}
          label="Trust & Verification"
          onClick={onTrustClick}
        />
        <SidebarLink
          icon={<FiBell className="h-[18px] w-[18px]" />}
          label="Notifications"
          onClick={onNotificationsClick}
        />
      </div>
    </CardWrapper>
  );
};

export default ProfileSidebarCard;
