"use client";

import { getOutlets } from "@/lib/apis";
import type {
  CatalogOutletRecord,
  Outlet,
  OutletFilterId,
} from "@/lib/types";
import { showToast } from "@/shared/ToastMessage";
import type { AuthUser } from "@/utils/authSession";
import { storageKeys } from "@/utils/enum";
import { getLocalItem } from "@/utils/localstorage";
import { persistSelectedOutlet } from "@/utils/outletSession";
import { menuPath } from "@/utils/routes";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const DEFAULT_OUTLET_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

function mapCatalogOutletToOutlet(
  raw: CatalogOutletRecord,
  featured: boolean,
): Outlet {
  const locationParts = [raw.address, raw.city].filter(Boolean);
  const description =
    locationParts.length > 0
      ? locationParts.join(" · ")
      : "Order pickup and dine-in available.";

  let openUntil = "Hours vary";
  if (raw.schedule?.endTime) {
    openUntil = raw.schedule.endTime;
  } else if (raw.status === "open") {
    openUntil = "Open now";
  } else if (raw.status === "closed") {
    openUntil = "Closed";
  }

  return {
    id: raw.id,
    name: raw.name,
    description,
    rating: typeof raw.rating === "number" ? raw.rating : 4.5,
    distanceMiles: raw.location?.distance ?? 0,
    openUntil,
    imageUrl: raw.image?.trim() || DEFAULT_OUTLET_IMAGE,
    featured,
  };
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

  const {
    data: outlets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.outlets.list(),
    queryFn: async () => {
      const data = await getOutlets();
      if (!Array.isArray(data)) return [];
      return data.map((raw, index) =>
        mapCatalogOutletToOutlet(raw, index === 0),
      );
    },
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
      router.push(menuPath(outlet.id));
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
    isError,
    refetch,
    selectingId,
    handleSelectOutlet,
  };
}
