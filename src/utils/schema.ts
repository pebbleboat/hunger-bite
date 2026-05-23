import * as Yup from "yup";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export const loginInitialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const signupInitialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export type ForgotPasswordEmailValues = {
  email: string;
};

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export const forgotPasswordEmailInitialValues: ForgotPasswordEmailValues = {
  email: "",
};

export const resetPasswordInitialValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export const forgotPasswordEmailSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});
