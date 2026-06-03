import { API_PATHS, AUTH_PATHS } from "./apiConstant";
import axiosInstance from "./axiosInstance";
import type { LoginResponse, SignupResponse } from "@/utils/authSession";
import {
  CatalogMenuItemRecord,
  CatalogOutletRecord,
  CreateOrderPayload,
  ForgotPasswordPayload,
  LoginPayload,
  OrderRow,
  ResetPasswordPayload,
  SignupPayload,
} from "./types";
import { MicroService } from "@/utils/enum";

// ----------------------------------------------------------------------------------------------------------
// -------------------------------------------------- AUTH --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function login(payload: LoginPayload) {
  const { data } = await axiosInstance(MicroService.AUTH).post<LoginResponse>(
    AUTH_PATHS.login,
    payload,
  );
  return data;
}

export async function signup(payload: SignupPayload) {
  const { data } = await axiosInstance(MicroService.AUTH).post<SignupResponse>(
    AUTH_PATHS.signup,
    payload,
  );
  return data;
}

export async function requestPasswordReset(payload: ForgotPasswordPayload) {
  const { data } = await axiosInstance(MicroService.AUTH).post<{
    message: string;
  }>(AUTH_PATHS.forgotPassword, payload);
  return data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await axiosInstance(MicroService.AUTH).post<{
    message: string;
  }>(AUTH_PATHS.resetPassword, payload);
  return data;
}

// ----------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Outlet -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function getOutlets() {
  const { data } = await axiosInstance(MicroService.CATALOG).get<
    CatalogOutletRecord[]
  >(API_PATHS.outlets);
  return data;
}

// ----------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Menu --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function getMenuItems(outletId: string) {
  const { data } = await axiosInstance(MicroService.CATALOG).get<
    CatalogMenuItemRecord[]
  >(API_PATHS.menuItems(outletId));
  return data;
}

// ----------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Orders -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

export async function getOutletOrders(outletId: string) {
  const { data } = await axiosInstance(MicroService.ORDER).get<OrderRow[]>(
    API_PATHS.outletOrders(outletId),
  );
  return data;
}

export async function createOrder(
  outletId: string,
  body: CreateOrderPayload,
) {
  const { data } = await axiosInstance(MicroService.ORDER).post<OrderRow>(
    API_PATHS.createOrder(outletId),
    body,
  );
  return data;
}
