import { login } from "@/lib/apis";
import { HUNGERBITE_AUTH_ROLE } from "@/lib/apiConstant";
import { showToast } from "@/shared/ToastMessage";
import { apiErrorMessage } from "@/utils/apiError";
import { persistAuthSession } from "@/utils/authSession";
import { loginInitialValues, loginSchema } from "@/utils/schema";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/lib/types";

export function useHook() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (res) => {
      persistAuthSession(res.accessToken);
      showToast({
        type: "success",
        title: res.message ?? "Login successful",
      });
      router.replace("/select-outlet");
    },
    onError: (err) => {
      showToast({
        type: "error",
        title: apiErrorMessage(err, "Login failed"),
      });
    },
  });

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      mutate({
        email: values.email.trim(),
        password: values.password,
        role: HUNGERBITE_AUTH_ROLE,
      });
    },
  });

  return {
    formik,
    isSubmitting: isPending,
  };
}
