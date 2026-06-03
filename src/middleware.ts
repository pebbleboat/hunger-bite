import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { storageKeys } from "@/utils/enum";
import { isMenuPath, menuPath } from "@/utils/routes";

const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password"];

function getSelectedOutletId(request: NextRequest): string | null {
  const raw = request.cookies.get(storageKeys.SELECTED_OUTLET)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { id?: string };
    return parsed.id ?? raw;
  } catch {
    return raw;
  }
}

function hasSelectedOutlet(request: NextRequest): boolean {
  return Boolean(getSelectedOutletId(request));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(storageKeys.ACCESS_TOKEN)?.value;
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const outletSelected = hasSelectedOutlet(request);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const selectedOutletId = getSelectedOutletId(request);
  const menuUrl =
    outletSelected && selectedOutletId
      ? menuPath(selectedOutletId)
      : "/select-outlet";

  if (token && pathname === "/menu" && selectedOutletId) {
    return NextResponse.redirect(new URL(menuPath(selectedOutletId), request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL(menuUrl, request.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL(menuUrl, request.url));
  }

  if (
    token &&
    (isMenuPath(pathname) || pathname === "/finish-order") &&
    !outletSelected
  ) {
    return NextResponse.redirect(new URL("/select-outlet", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
