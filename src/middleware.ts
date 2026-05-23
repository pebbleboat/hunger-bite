import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { storageKeys } from "@/utils/enum";

const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password"];

function hasSelectedOutlet(request: NextRequest): boolean {
  const raw = request.cookies.get(storageKeys.SELECTED_OUTLET)?.value;
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { id?: string };
    return Boolean(parsed.id ?? raw);
  } catch {
    return Boolean(raw);
  }
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

  if (token && isPublic) {
    return NextResponse.redirect(
      new URL(outletSelected ? "/menu" : "/select-outlet", request.url),
    );
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(
      new URL(outletSelected ? "/menu" : "/select-outlet", request.url),
    );
  }

  if (
    token &&
    (pathname === "/menu" || pathname === "/finish-order") &&
    !outletSelected
  ) {
    return NextResponse.redirect(new URL("/select-outlet", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
