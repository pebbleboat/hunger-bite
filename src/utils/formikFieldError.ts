import type { FormikProps } from "formik";

export function formikFieldError<T extends object>(
  formik: FormikProps<T>,
  field: keyof T & string,
): string | undefined {
  const touched = formik.touched[field as keyof typeof formik.touched];
  const error = formik.errors[field as keyof typeof formik.errors];
  if (touched && typeof error === "string") return error;
  return undefined;
}
