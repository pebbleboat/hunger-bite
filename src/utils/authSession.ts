import { setCookie, removeCookie } from "@/utils/cookies";
import { storageKeys } from "@/utils/enum";
import { clearSelectedOutlet } from "@/utils/outletSession";
import { setLocalItem, removeLocalItem } from "@/utils/localstorage";

export type AuthUser = {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  outletId?: number | string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  role: string;
};

export type SignupResponse = {
  message: string;
  userId: string;
  role: string;
};

export function parseJwtPayload(token: string): AuthUser | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as AuthUser;
  } catch {
    return null;
  }
}

export function persistAuthSession(accessToken: string): AuthUser | null {
  const profile = parseJwtPayload(accessToken);
  setCookie(storageKeys.ACCESS_TOKEN, accessToken, 7);
  if (profile) {
    setLocalItem(storageKeys.CURRENT_USER, profile);
    setLocalItem(storageKeys.LOGIN_DETAILS, {
      role: profile.role,
      email: profile.email,
    });
  }
  return profile;
}

export function clearAuthSession(): void {
  removeCookie(storageKeys.ACCESS_TOKEN);
  removeCookie(storageKeys.REFRESH_TOKEN);
  removeLocalItem(storageKeys.CURRENT_USER);
  removeLocalItem(storageKeys.LOGIN_DETAILS);
  clearSelectedOutlet();
}

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = `${storageKeys.ACCESS_TOKEN}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      const raw = c.substring(nameEQ.length);
      try {
        return JSON.parse(raw) as string;
      } catch {
        return raw;
      }
    }
  }
  return null;
}
