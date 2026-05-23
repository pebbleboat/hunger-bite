import type { UserProfile } from "@/lib/types";
import type { AuthUser } from "@/utils/authSession";

/** Placeholder until profile API is wired in lib/apis.ts */
export const MOCK_PROFILE_FALLBACK: Omit<
  UserProfile,
  "fullName" | "email" | "initials"
> = {
  phone: "+1 (555) 012-3456",
  preferredLanguage: "English (US)",
  memberSince: "2023",
  activeOrders: 2,
  totalDelivered: 48,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "User";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function buildUserProfile(authUser: AuthUser | null): UserProfile {
  const fullName =
    authUser?.name?.trim() ||
    (authUser?.email ? nameFromEmail(authUser.email) : "Julian Smith");
  const email = authUser?.email ?? "julian.smith@example.com";

  return {
    fullName,
    email,
    initials: getInitials(fullName),
    ...MOCK_PROFILE_FALLBACK,
  };
}
