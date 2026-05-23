/**
 * Order service base URL for REST calls from the browser.
 */
export const ORDER_API_BASE_URL =
  process.env.NEXT_PUBLIC_ORDER_API_URL ??
  process.env.NEXT_PUBLIC_ORDER_URL ??
  "http://127.0.0.1:8081";

/** Auth service (login / signup). */
export const AUTH_API_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:8080";

export const API_PATHS = {
  outletOrders: (outletId: string) =>
    `/outlet/${encodeURIComponent(outletId)}/orders`,
  createOrder: (outletId: string) =>
    `/outlet/${encodeURIComponent(outletId)}/create-order`,
} as const;

export const AUTH_PATHS = {
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
} as const;

/** HungerBite always authenticates as a customer. */
export const HUNGERBITE_AUTH_ROLE = "customer" as const;

/** @deprecated Use HUNGERBITE_AUTH_ROLE */
export const ORDER_PORTAL_AUTH_ROLE = HUNGERBITE_AUTH_ROLE;
