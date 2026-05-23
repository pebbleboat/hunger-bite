import { setCookie, removeCookie } from "@/utils/cookies";
import { storageKeys } from "@/utils/enum";
import { setLocalItem, removeLocalItem, getLocalItem } from "@/utils/localstorage";
import type { Outlet } from "@/lib/types";

export function persistSelectedOutlet(outlet: Outlet): void {
  setLocalItem(storageKeys.SELECTED_OUTLET, outlet);
  setCookie(storageKeys.SELECTED_OUTLET, JSON.stringify({ id: outlet.id }), 7);
}

export function getSelectedOutlet(): Outlet | null {
  return getLocalItem<Outlet>(storageKeys.SELECTED_OUTLET);
}

export function clearSelectedOutlet(): void {
  removeLocalItem(storageKeys.SELECTED_OUTLET);
  removeCookie(storageKeys.SELECTED_OUTLET);
}

export function getSelectedOutletIdFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = `${storageKeys.SELECTED_OUTLET}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      const raw = c.substring(nameEQ.length);
      try {
        const parsed = JSON.parse(raw) as { id?: string };
        return parsed.id ?? raw;
      } catch {
        return raw;
      }
    }
  }
  return null;
}
