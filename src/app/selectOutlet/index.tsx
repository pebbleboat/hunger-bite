"use client";

import HungerBiteNavbar from "@/components/hungerBite/HungerBiteNavbar";
import EmptyState from "@/shared/EmptyState";
import Text from "@/shared/heading/Text";
import FeaturedOutletCard from "./components/FeaturedOutletCard";
import FilterBar from "./components/FilterBar";
import OutletCard from "./components/OutletCard";
import { useHook } from "./useHook";

export function SelectOutlet() {
  const {
    displayName,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    featured,
    standard,
    outletCount,
    isLoading,
    isError,
    refetch,
    selectingId,
    handleSelectOutlet,
  } = useHook();

  const outlets = [...(featured ? [featured] : []), ...standard];

  const emptyStateData = isError
    ? {
        title: "Could not load outlets",
        subtitle:
          "Check that the catalog service is running and try again.",
        btnProps: {
          btnName: "Try again",
          onClick: () => refetch(),
        },
      }
    : {
        title: search.trim() ? "No outlets found" : "No outlets available",
        subtitle: search.trim()
          ? "No outlets match your search. Try a different filter or keyword."
          : "No outlets available yet.",
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <HungerBiteNavbar search={search} onSearchChange={setSearch} />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8">
          <Text as="h1" size="3xl" type="bold" className="text-brand-950">
            Welcome back, {displayName}
          </Text>
          <Text size="base" variant="secondary" className="mt-2 max-w-2xl">
            Select an outlet to start your order. We found {outletCount}{" "}
            available locations near you.
          </Text>
        </div>

        <div className="mb-8">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <EmptyState
          pageData={isLoading ? null : isError ? [] : outlets}
          data={emptyStateData}
          hideBtn={!isError}
          loaderClass="py-20"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured ? (
              <FeaturedOutletCard
                outlet={featured}
                onSelect={handleSelectOutlet}
                isSelecting={selectingId === featured.id}
              />
            ) : null}
            {standard.map((outlet) => (
              <OutletCard
                key={outlet.id}
                outlet={outlet}
                onSelect={handleSelectOutlet}
              />
            ))}
          </div>
        </EmptyState>
      </div>
    </div>
  );
}
