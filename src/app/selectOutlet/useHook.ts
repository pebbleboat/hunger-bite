"use client";

import type { Outlet, OutletFilterId } from "@/lib/types";
import { showToast } from "@/shared/ToastMessage";
import type { AuthUser } from "@/utils/authSession";
import { storageKeys } from "@/utils/enum";
import { getLocalItem } from "@/utils/localstorage";
import { MOCK_OUTLETS } from "@/utils/mockOutlets";
import { persistSelectedOutlet } from "@/utils/outletSession";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/** Replace with lib/apis outlet list when API is available */
async function fetchOutlets(): Promise<Outlet[]> {
  return MOCK_OUTLETS;
}

function filterOutlets(
  outlets: Outlet[],
  filter: OutletFilterId,
  search: string,
): Outlet[] {
  let list = [...outlets];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q),
    );
  }

  switch (filter) {
    case "nearby":
      list.sort((a, b) => a.distanceMiles - b.distanceMiles);
      break;
    case "top-rated":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "cuisine":
    case "more-filters":
    default:
      break;
  }

  return list;
}

export function useHook() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<OutletFilterId>("nearby");
  const [selectingId, setSelectingId] = useState<string | null>(null);

  const user = getLocalItem<AuthUser>(storageKeys.CURRENT_USER);
  const displayName =
    user?.name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  const { data: outlets = [], isLoading } = useQuery({
    queryKey: queryKeys.outlets.list(activeFilter, search),
    queryFn: fetchOutlets,
  });

  const filteredOutlets = useMemo(
    () => filterOutlets(outlets, activeFilter, search),
    [outlets, activeFilter, search],
  );

  const featured = filteredOutlets.find((o) => o.featured);
  const standard = filteredOutlets.filter((o) => !o.featured);

  const handleSelectOutlet = async (outlet: Outlet) => {
    setSelectingId(outlet.id);
    try {
      persistSelectedOutlet(outlet);
      router.push("/menu");
    } catch {
      showToast({ type: "error", title: "Could not select outlet" });
      setSelectingId(null);
    }
  };

  return {
    displayName,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    featured,
    standard,
    outletCount: filteredOutlets.length,
    isLoading,
    selectingId,
    handleSelectOutlet,
  };
}
