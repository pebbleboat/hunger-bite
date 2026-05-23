"use client";

import HungerBiteNavbar from "@/components/hungerBite/HungerBiteNavbar";
import Loader from "@/shared/Loader";
import Text from "@/shared/heading/Text";
import { showToast } from "@/shared/ToastMessage";
import ProfileDeactivateCard from "./components/ProfileDeactivateCard";
import ProfileOrderSummaryCard from "./components/ProfileOrderSummaryCard";
import ProfilePersonalInfoCard from "./components/ProfilePersonalInfoCard";
import ProfileSidebarCard from "./components/ProfileSidebarCard";
import { useHook } from "./useHook";

export function Profile() {
  const { ready, search, setSearch, profile, cartCount } = useHook();

  const showComingSoon = (title: string) => {
    showToast({
      type: "warning",
      title,
      subtitle: "This feature is coming soon.",
    });
  };

  if (!ready) {
    return <Loader className="h-screen" size={28} variant="full-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HungerBiteNavbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search..."
        cartCount={cartCount}
        activeNav="profile"
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="mb-8">
          <Text as="h1" size="2xl" type="bold" className="text-brand-950 md:text-3xl">
            Account Settings
          </Text>
          <Text size="sm" variant="tertiary" className="mt-2">
            Manage your personal information and profile settings.
          </Text>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 space-y-4 lg:w-[340px]">
            <ProfileSidebarCard
              profile={profile}
              onTrustClick={() => showComingSoon("Trust & Verification")}
              onNotificationsClick={() => showComingSoon("Notifications")}
            />
            <ProfileOrderSummaryCard profile={profile} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <ProfilePersonalInfoCard
              profile={profile}
              onEdit={() => showComingSoon("Edit profile")}
            />
            <ProfileDeactivateCard
              onDeactivate={() => showComingSoon("Deactivate account")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
