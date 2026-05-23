import { signup } from "@/lib/apis";
import { HUNGERBITE_AUTH_ROLE } from "@/lib/apiConstant";
import { showToast } from "@/shared/ToastMessage";
import { apiErrorMessage } from "@/utils/apiError";
import { signupInitialValues, signupSchema } from "@/utils/schema";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SignupPayload } from "@/lib/types";

export function useHook() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (res) => {
      showToast({
        type: "success",
        title: res.message ?? "Signup successful",
        subtitle: "You can sign in now.",
      });
      router.replace("/login");
    },
    onError: (err) => {
      showToast({
        type: "error",
        title: apiErrorMessage(err, "Signup failed"),
      });
    },
  });

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      mutate({
        name: values.name.trim(),
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
