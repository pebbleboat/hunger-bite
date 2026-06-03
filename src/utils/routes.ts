import { getSelectedOutlet } from "@/utils/outletSession";

export const MENU_PATH_PATTERN = /^\/([^/]+)\/menu\/?$/;

export function menuPath(outletId: string): string {
  return `/${encodeURIComponent(outletId)}/menu`;
}

export function parseMenuOutletId(pathname: string): string | null {
  const match = pathname.match(MENU_PATH_PATTERN);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function isMenuPath(pathname: string): boolean {
  return MENU_PATH_PATTERN.test(pathname);
}

export function getSelectedMenuPath(): string | null {
  const outlet = getSelectedOutlet();
  return outlet?.id ? menuPath(outlet.id) : null;
}
