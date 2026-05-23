"use client";

import CardWrapper from "@/shared/cards/CardWrapper";
import Img from "@/shared/Img";
import Text from "@/shared/heading/Text";
import type { PlacedOrder } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import {
  FiBookmark,
  FiClock,
  FiMapPin,
  FiSettings,
  FiShoppingBag,
} from "react-icons/fi";

type OrderStatusCartSidebarProps = {
  order: PlacedOrder;
  formatPrice: (amount: number) => string;
};

const SIDEBAR_LINKS = [
  { label: "Order History", href: "#", icon: FiClock },
  { label: "Saved Items", href: "#", icon: FiBookmark },
  { label: "Settings", href: "#", icon: FiSettings },
] as const;

const OrderStatusCartSidebar = ({
  order,
  formatPrice,
}: OrderStatusCartSidebarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <CardWrapper className="border-gray-200 !p-0 shadow-sm">
        <div className="border-b border-gray-100 px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-950">
              <FiShoppingBag className="h-4 w-4 text-white" />
            </div>
            <div>
              <Text as="h2" size="lg" type="bold" className="text-brand-950">
                Your Cart
              </Text>
              <div className="mt-0.5 flex items-center gap-1">
                <FiMapPin className="h-3.5 w-3.5 text-gray-400" />
                <Text size="xs" variant="tertiary">
                  Table 12 • Dine In
                </Text>
              </div>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-gray-100 px-5">
          {order.cartLines.map((line) => (
            <li key={line.item.id} className="flex gap-3 py-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Img
                  src={line.item.imageUrl}
                  alt={line.item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  as="span"
                  size="sm"
                  type="semibold"
                  className="block text-brand-950"
                >
                  {line.item.name}
                </Text>
                <Text size="xs" variant="tertiary" className="mt-0.5">
                  x{line.quantity}
                  {line.note ? ` • ${line.note}` : ""}
                </Text>
              </div>
              <Text
                as="span"
                size="sm"
                type="semibold"
                className="shrink-0 text-brand-950"
              >
                {formatPrice(line.item.price * line.quantity)}
              </Text>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t border-gray-100 px-5 py-4">
          <div className="flex justify-between">
            <Text size="sm" variant="secondary">
              Subtotal
            </Text>
            <Text size="sm" type="medium">
              {formatPrice(order.subtotal)}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text size="sm" variant="secondary">
              Tax
            </Text>
            <Text size="sm" type="medium">
              {formatPrice(order.tax)}
            </Text>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <Text size="base" type="bold" className="text-brand-950">
              Total
            </Text>
            <Text size="base" type="bold" className="text-brand-950">
              {formatPrice(order.total)}
            </Text>
          </div>
        </div>
      </CardWrapper>

      <CardWrapper className="border-gray-200 !p-2 shadow-sm">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <Text as="span" size="sm" type="medium">
                {link.label}
              </Text>
            </Link>
          );
        })}
      </CardWrapper>
    </div>
  );
};

export default OrderStatusCartSidebar;
