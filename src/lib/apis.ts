import { API_PATHS, AUTH_PATHS } from "./apiConstant";
import axiosInstance from "./axiosInstance";
import type { LoginResponse, SignupResponse } from "@/utils/authSession";
import {
  ForgotPasswordPayload,
  LoginPayload,
  MenuItem,
  OrderRow,
  Outlet,
  ResetPasswordPayload,
  SignupPayload,
} from "./types";
import { MicroService } from "@/utils/enum";

// ----------------------------------------------------------------------------------------------------------
// -------------------------------------------------- AUTH --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await axiosInstance(MicroService.AUTH).post(
    AUTH_PATHS.login,
    payload,
  );
  return data;
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await axiosInstance(MicroService.AUTH).post(
    AUTH_PATHS.signup,
    payload,
  );
  return data;
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await axiosInstance(MicroService.AUTH).post(
    AUTH_PATHS.forgotPassword,
    payload,
  );
  return data;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await axiosInstance(MicroService.AUTH).post(
    AUTH_PATHS.resetPassword,
    payload,
  );
  return data;
}

// ----------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Outlet -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

const DEFAULT_OUTLET_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

type CatalogOutletRecord = {
  id?: string;
  _id?: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  status?: string;
  isAcceptingOrders?: boolean;
  rating?: number;
  image?: string;
  location?: { distance?: number };
  schedule?: { startTime?: string; endTime?: string };
};

function mapCatalogOutletToOutlet(
  raw: CatalogOutletRecord,
  featured: boolean,
): Outlet {
  const id = String(raw.id ?? raw._id ?? "");
  const locationParts = [raw.address, raw.city].filter(Boolean);
  const description =
    locationParts.length > 0
      ? locationParts.join(" · ")
      : "Order pickup and dine-in available.";

  let openUntil = "Hours vary";
  if (raw.schedule?.endTime) {
    openUntil = raw.schedule.endTime;
  } else if (raw.status === "open") {
    openUntil = "Open now";
  } else if (raw.status === "closed") {
    openUntil = "Closed";
  }

  return {
    id,
    name: raw.name,
    description,
    rating: typeof raw.rating === "number" ? raw.rating : 4.5,
    distanceMiles: raw.location?.distance ?? 0,
    openUntil,
    imageUrl: raw.image?.trim() || DEFAULT_OUTLET_IMAGE,
    featured,
  };
}

export async function getOutlets(): Promise<Outlet[]> {
  const { data } = await axiosInstance(MicroService.CATALOG).get<
    CatalogOutletRecord[]
  >(API_PATHS.outlets);
  if (!Array.isArray(data)) return [];
  return data
    .map((raw, index) => mapCatalogOutletToOutlet(raw, index === 0))
    .filter((outlet) => Boolean(outlet.id));
}

// ----------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Menu --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

const DEFAULT_MENU_ITEM_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

type CatalogMenuItemRecord = {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  price?: number;
  status?: string;
  category?: string;
  image?: string;
  dietary?: string;
};

function isMenuItemAvailable(status?: string): boolean {
  const value = (status ?? "available").toLowerCase().replace(/\s+/g, "_");
  return value === "available";
}

function mapCatalogMenuItem(raw: CatalogMenuItemRecord): MenuItem | null {
  const id = String(raw.id ?? raw._id ?? "");
  if (!id || !isMenuItemAvailable(raw.status)) return null;

  return {
    id,
    name: raw.name,
    description: raw.description ?? "",
    price: Number(raw.price) || 0,
    imageUrl: raw.image?.trim() || DEFAULT_MENU_ITEM_IMAGE,
    category: raw.category ?? "default",
    dietary: raw.dietary,
  };
}

export async function getMenuItems(outletId: string): Promise<MenuItem[]> {
  const { data } = await axiosInstance(MicroService.CATALOG).get<
    CatalogMenuItemRecord[]
  >(API_PATHS.menuItems(outletId));
  if (!Array.isArray(data)) return [];
  return data
    .map(mapCatalogMenuItem)
    .filter((item): item is MenuItem => item !== null);
}

// ----------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Orders -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function getOutletOrders(outletId: string): Promise<OrderRow[]> {
  const { data } = await axiosInstance(MicroService.ORDER).get<OrderRow[]>(
    API_PATHS.outletOrders(outletId),
  );
  return Array.isArray(data) ? data : [];
}

export async function createOrder(
  outletId: string,
  body: { item: string; quantity: number },
): Promise<OrderRow> {
  const { data } = await axiosInstance(MicroService.ORDER).post<OrderRow>(
    API_PATHS.createOrder(outletId),
    body,
  );
  return data;
}
