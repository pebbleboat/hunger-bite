"use client";

import { SvgLogo } from "@/assets/svgs";
import MenuPopover from "@/shared/popover/MenuPopover";
import InputField from "@/shared/input/InputField";
import Text from "@/shared/heading/Text";
import { clearAuthSession } from "@/utils/authSession";
import { getSelectedMenuPath, isMenuPath } from "@/utils/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Orders", href: "/order-status", id: "orders" as const },
  { label: "Profile", href: "/profile", id: "profile" as const },
] as const;

export type HungerBiteNavId = (typeof NAV_ITEMS)[number]["id"];

type HungerBiteNavbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  cartCount?: number;
  activeNav?: HungerBiteNavId;
};

const HungerBiteNavbar = ({
  search,
  onSearchChange,
  searchPlaceholder = "Search outlets...",
  cartCount = 0,
  activeNav,
}: HungerBiteNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const homeHref = getSelectedMenuPath() ?? "/select-outlet";

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  const resolvedActive =
    activeNav ??
    (pathname === "/order-status" || pathname === "/finish-order"
      ? "orders"
      : isMenuPath(pathname)
        ? "home"
        : pathname.startsWith("/profile")
          ? "profile"
          : pathname.startsWith("/select-outlet")
            ? undefined
            : undefined);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <Link
          href="/select-outlet"
          className="flex shrink-0 items-center"
          aria-label="HungerBite home"
        >
          <SvgLogo className="h-8 w-auto sm:h-10" />
          <Text
            as="span"
            size="xl"
            type="bold"
            className="tracking-tight text-brand-950 -ml-1"
          >
            HungerBite
          </Text>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href={homeHref}>
            <Text
              as="span"
              size="sm"
              type="medium"
              className={clsx(
                "pb-0.5 transition-colors",
                resolvedActive === "home"
                  ? "border-b-2 border-brand-950 text-brand-950"
                  : "text-gray-500 hover:text-brand-950",
              )}
            >
              Home
            </Text>
          </Link>
          {NAV_ITEMS.map((item) => {
            const isActive = resolvedActive === item.id;
            return (
              <Link key={item.label} href={item.href}>
                <Text
                  as="span"
                  size="sm"
                  type="medium"
                  className={clsx(
                    "pb-0.5 transition-colors",
                    isActive
                      ? "border-b-2 border-brand-950 text-brand-950"
                      : "text-gray-500 hover:text-brand-950",
                  )}
                >
                  {item.label}
                </Text>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 md:max-w-md lg:max-w-sm">
          <InputField
            name="hungerbite-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            icon={<FiSearch className="h-[18px] w-[18px] text-gray-400" />}
            wrapperClass="flex-1 min-w-[140px]"
            className="h-10 border-gray-200 bg-gray-50 pl-10 text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Cart"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-950 px-1">
                <Text as="span" size="xxs" type="semibold" variant="white">
                  {cartCount > 9 ? "9+" : cartCount}
                </Text>
              </span>
            ) : null}
          </button>
          <MenuPopover
            anchor="bottom end"
            menuButtonClassName="!h-10 !w-10 shrink-0 !rounded-full !p-0"
            menuItemsClassName="w-44 py-1"
            items={[
              {
                type: "item",
                id: "my-profile",
                label: "My Profile",
                icon: <FiUser />,
                onClick: () => router.push("/profile"),
              },
              {
                type: "item",
                id: "logout",
                label: "Logout",
                icon: <FiLogOut />,
                variant: "danger",
                onClick: handleLogout,
              },
            ]}
          >
            <>
              <span className="sr-only">Profile menu</span>
              <span
                className="block h-10 w-10 rounded-full bg-gradient-to-br from-brand-200 to-brand-600"
                aria-hidden
              />
            </>
          </MenuPopover>
        </div>
      </div>
    </header>
  );
};

export default HungerBiteNavbar;
