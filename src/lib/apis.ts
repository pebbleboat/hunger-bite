import {
  API_PATHS,
  AUTH_API_BASE_URL,
  AUTH_PATHS,
  ORDER_API_BASE_URL,
} from "./apiConstant";
import { axiosInstance } from "./axiosInstance";
import type { LoginResponse, SignupResponse } from "@/utils/authSession";
import {
  OrderRow,
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./types";



export async function getOutletOrders(outletId: string): Promise<OrderRow[]> {
  const { data } = await axiosInstance.get<OrderRow[]>(
    API_PATHS.outletOrders(outletId),
    { baseURL: ORDER_API_BASE_URL },
  );
  return Array.isArray(data) ? data : [];
}

export async function createOrder(
  outletId: string,
  body: { item: string; quantity: number },
): Promise<OrderRow> {
  const { data } = await axiosInstance.post<OrderRow>(
    API_PATHS.createOrder(outletId),
    body,
    { baseURL: ORDER_API_BASE_URL },
  );
  return data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>(
    AUTH_PATHS.login,
    payload,
    { baseURL: AUTH_API_BASE_URL },
  );
  return data;
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await axiosInstance.post<SignupResponse>(
    AUTH_PATHS.signup,
    payload,
    { baseURL: AUTH_API_BASE_URL },
  );
  return data;
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await axiosInstance.post<{ message: string }>(
    AUTH_PATHS.forgotPassword,
    payload,
    { baseURL: AUTH_API_BASE_URL },
  );
  return data;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await axiosInstance.post<{ message: string }>(
    AUTH_PATHS.resetPassword,
    payload,
    { baseURL: AUTH_API_BASE_URL },
  );
  return data;
}
