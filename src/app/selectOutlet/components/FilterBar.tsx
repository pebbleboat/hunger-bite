"use client";

import type { OutletFilterId } from "@/lib/types";
import Text from "@/shared/heading/Text";
import clsx from "clsx";
import { FiFilter, FiNavigation, FiStar, FiCoffee } from "react-icons/fi";

const FILTERS: {
  id: OutletFilterId;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "nearby", label: "Nearby", icon: <FiNavigation className="h-4 w-4" /> },
  { id: "top-rated", label: "Top Rated", icon: <FiStar className="h-4 w-4" /> },
  { id: "cuisine", label: "Cuisine", icon: <FiCoffee className="h-4 w-4" /> },
  {
    id: "more-filters",
    label: "More Filters",
    icon: <FiFilter className="h-4 w-4" />,
  },
];

type FilterBarProps = {
  activeFilter: OutletFilterId;
  onFilterChange: (id: OutletFilterId) => void;
};

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-950 bg-brand-950 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
            )}
          >
            {filter.icon}
            <Text
              as="span"
              size="sm"
              type="medium"
              className={isActive ? "text-white" : "text-gray-700"}
            >
              {filter.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
