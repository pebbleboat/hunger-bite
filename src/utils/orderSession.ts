import type { CartLine, Outlet, PlacedOrder } from "@/lib/types";
import { TAX_RATE } from "@/utils/formatPrice";
import { storageKeys } from "@/utils/enum";
import {
  getLocalItem,
  removeLocalItem,
  setLocalItem,
} from "@/utils/localstorage";
import { MOCK_ORDER_STATUS } from "./mockOrderStatus";

export function persistPlacedOrder(order: PlacedOrder): void {
  setLocalItem(storageKeys.PLACED_ORDER, order);
}

export function getPlacedOrder(): PlacedOrder | null {
  return getLocalItem<PlacedOrder>(storageKeys.PLACED_ORDER);
}

export function clearPlacedOrder(): void {
  removeLocalItem(storageKeys.PLACED_ORDER);
}

export function buildPlacedOrderFromCart(
  cartLines: CartLine[],
  outlet: Outlet,
  instructions?: string,
): PlacedOrder {
  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.item.price * line.quantity,
    0,
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    ...MOCK_ORDER_STATUS,
    cartLines,
    subtotal,
    tax,
    total,
    instructions,
    outletName: outlet.name,
  };
}
