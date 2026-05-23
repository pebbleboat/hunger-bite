import type { CartLine } from "@/lib/types";
import { storageKeys } from "@/utils/enum";
import {
  getLocalItem,
  removeLocalItem,
  setLocalItem,
} from "@/utils/localstorage";

export type CartDraft = {
  lines: CartLine[];
  instructions?: string;
};

export function persistCart(lines: CartLine[], instructions?: string): void {
  setLocalItem(storageKeys.CART, { lines, instructions } satisfies CartDraft);
}

export function getCart(): CartDraft | null {
  return getLocalItem<CartDraft>(storageKeys.CART);
}

export function clearCart(): void {
  removeLocalItem(storageKeys.CART);
}

export function updateCartInstructions(instructions: string): void {
  const cart = getCart();
  if (!cart) return;
  persistCart(cart.lines, instructions);
}
