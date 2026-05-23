"use client";

import PageWrapper from "@/components/pageWrapper";
import { getLocalItem } from "@/utils/localstorage";
import { storageKeys } from "@/utils/enum";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import Loader from "@/shared/Loader";

const HUNGERBITE_SHELL_PATHS = [
  "/select-outlet",
  "/menu",
  "/finish-order",
  "/order-status",
  "/profile",
];

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const useHungerBiteShell = HUNGERBITE_SHELL_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  useEffect(() => {
    const token =
      typeof document !== "undefined" &&
      document.cookie.includes(`${storageKeys.ACCESS_TOKEN}=`);
    const cached = getLocalItem(storageKeys.CURRENT_USER);
    if (!token && !cached) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <Loader className="h-screen" size={28} variant="full-screen" />;
  }

  if (useHungerBiteShell) {
    return <>{children}</>;
  }

  return <PageWrapper>{children}</PageWrapper>;
};

export default DashboardLayout;
