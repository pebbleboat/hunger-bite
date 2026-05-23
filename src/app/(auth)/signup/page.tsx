"use client";

import AuthPageShell from "@/components/auth/AuthPageShell";
import Button from "@/shared/buttons/Button";
import InputField from "@/shared/input/InputField";
import TextWithLinks from "@/shared/heading/TextWithLinks";
import { formikFieldError } from "@/utils/formikFieldError";
import { useHook } from "./useHook";

export default function SignupPage() {
  const { formik, isSubmitting } = useHook();

  return (
    <AuthPageShell title="Create account" subtitle="Register for HungerBite">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Name"
          name="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formikFieldError(formik, "name")}
          placeholder="Your name"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formikFieldError(formik, "email")}
          placeholder="you@example.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formikFieldError(formik, "password")}
          placeholder="Min. 6 characters"
        />
        <Button
          type="submit"
          btnName={isSubmitting ? "Creating account…" : "Sign up"}
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />
      </form>
      <TextWithLinks
        className="mt-6"
        text="Already have an account?"
        textProps={{ size: "sm", variant: "secondary" }}
        links={[{ label: "Sign in", link: "/login" }]}
      />
    </AuthPageShell>
  );
}
