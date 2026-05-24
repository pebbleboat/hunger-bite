"use client";

import HungerBiteNavbar from "@/components/hungerBite/HungerBiteNavbar";
import EmptyState from "@/shared/EmptyState";
import Loader from "@/shared/Loader";
import Text from "@/shared/heading/Text";
import CartSidebar from "./components/CartSidebar";
import MenuCategoryFilters from "./components/MenuCategoryFilters";
import MenuItemCard from "./components/MenuItemCard";
import { useHook } from "./useHook";

export function Menu() {
  const {
    outlet,
    ready,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    isLoading,
    isError,
    refetch,
    cartLines,
    addToCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    total,
    formatPrice,
    cartCount,
    handleReviewOrder,
  } = useHook();

  if (!ready) {
    return <Loader className="h-screen" size={28} variant="full-screen" />;
  }

  const emptyStateData = isError
    ? {
        title: "Could not load menu",
        subtitle:
          "Check that the catalog service is running and try again.",
        btnProps: {
          btnName: "Try again",
          onClick: () => refetch(),
        },
      }
    : {
        title:
          search.trim() || activeCategory !== "all"
            ? "No items found"
            : "Menu is empty",
        subtitle:
          search.trim() || activeCategory !== "all"
            ? "No menu items match your search or filter."
            : "This outlet has not added any items yet.",
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <HungerBiteNavbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search menu"
        cartCount={cartCount}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="mb-6 lg:hidden">
          <Text size="sm" variant="tertiary">
            {outlet?.name}
          </Text>
        </div>

        <div className="mb-6">
          <MenuCategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <EmptyState
              pageData={isLoading ? null : isError ? [] : filteredItems}
              data={emptyStateData}
              hideBtn={!isError}
              loaderClass="py-20"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    formatPrice={formatPrice}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </EmptyState>
          </div>

          <aside className="w-full shrink-0 lg:w-[340px] xl:w-[380px]">
            <CartSidebar
              cartLines={cartLines}
              formatPrice={formatPrice}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onReviewOrder={handleReviewOrder}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
