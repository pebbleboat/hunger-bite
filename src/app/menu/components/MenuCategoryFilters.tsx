"use client";

import type { MenuCategoryId } from "@/lib/types";
import Text from "@/shared/heading/Text";
import clsx from "clsx";

type MenuCategoryFiltersProps = {
  categories: { id: MenuCategoryId; label: string }[];
  activeCategory: MenuCategoryId;
  onCategoryChange: (id: MenuCategoryId) => void;
};

const MenuCategoryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuCategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={clsx(
              "rounded-full border px-4 py-2 transition-colors",
              isActive
                ? "border-brand-950 bg-brand-950"
                : "border-gray-200 bg-white hover:border-gray-300",
            )}
          >
            <Text
              as="span"
              size="sm"
              type="medium"
              className={isActive ? "text-white" : "text-brand-950"}
            >
              {category.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};

export default MenuCategoryFilters;
