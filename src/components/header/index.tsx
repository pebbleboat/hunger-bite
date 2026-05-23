"use client";
import ConfirmationModal from "@/shared/input/modal/ConfirmationModal";
import { storageKeys } from "@/utils/enum";
import { extractText } from "@/utils/functions";
import { clearAuthSession } from "@/utils/authSession";
import { getLocalItem } from "@/utils/localstorage";
import { IBreadCrumbs } from "@/utils/types";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export type UserDetails = Record<string, unknown>;

function readCachedUserDetails(): UserDetails | null {
  return getLocalItem<UserDetails>(storageKeys.CURRENT_USER);
}

const Header = ({ breadCrumbs }: { breadCrumbs?: IBreadCrumbs[] }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data: IBreadCrumbs[] = breadCrumbs?.length
    ? breadCrumbs
    : [pathName?.split("/")?.[1]].map((e) => ({
        label: extractText(e),
      }));

  const handleLogout = () => {
    setIsLoading(true);
    clearAuthSession();
    router.replace("/login");
  };

  return (
    <div className="lg:flex hidden items-center justify-between gap-4 pb-4 sticky top-0 w-full">
      <ConfirmationModal
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        onSubmit={handleLogout}
        styleHeader="flex gap-x-4 !space-y-0 items-center"
        rightBtnName="Yes, Logout"
        leftBtnName="Back"
        type="danger"
        isOpen={isOpen}
        size="md"
        isLoading={isLoading}
        close={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Header;
