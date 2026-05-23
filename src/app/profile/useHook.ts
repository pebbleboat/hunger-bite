"use client";

import type { UserProfile } from "@/lib/types";
import type { AuthUser } from "@/utils/authSession";
import { storageKeys } from "@/utils/enum";
import { getLocalItem } from "@/utils/localstorage";
import { buildUserProfile } from "@/utils/mockProfile";
import { getCart } from "@/utils/cartSession";
import { useEffect, useMemo, useState } from "react";

export function useHook() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setReady(true);
  }, []);

  const profile = useMemo(() => {
    const authUser = getLocalItem<AuthUser>(storageKeys.CURRENT_USER);
    return buildUserProfile(authUser);
  }, []);

  const cartCount =
    getCart()?.lines.reduce((n, line) => n + line.quantity, 0) ?? 0;

  return {
    ready,
    search,
    setSearch,
    profile,
    cartCount,
  };
}

export type ProfileViewModel = UserProfile;
