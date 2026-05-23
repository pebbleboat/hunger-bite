"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import Text from "@/shared/heading/Text";
import TextWithLinks from "@/shared/heading/TextWithLinks";
import InputField from "@/shared/input/InputField";
import { formikFieldError } from "@/utils/formikFieldError";
import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { useHook } from "./useHook";

export default function ForgotPasswordPage() {
  const {
    step,
    confirmedEmail,
    emailFormik,
    resetFormik,
    isConfirmingEmail,
    isResetting,
    goBackToEmail,
  } = useHook();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-white to-brand-50 px-4 py-12">
      <header className="mb-8 flex flex-col items-center text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-950 text-lg font-semibold text-white shadow-md"
          aria-hidden
        >
          <Text as="span" variant="white" className="font-mono leading-none">
            &gt;_
          </Text>
        </div>
        <Text
          as="h1"
          size="3xl"
          type="bold"
          className="mt-5 tracking-tight text-brand-950"
        >
          HungerBite
        </Text>
        <Text size="sm" variant="tertiary" className="mt-1">
          {step === "email"
            ? "Reset your password"
            : "Create a new password"}
        </Text>
      </header>

      <CardWrapper className="w-full max-w-[420px] border-gray-200 p-8 shadow-[0_12px_40px_rgba(15,35,80,0.08)]">
        {step === "email" ? (
          <form
            onSubmit={emailFormik.handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <Text as="h2" size="xl" type="bold" className="text-brand-950">
                Forgot password?
              </Text>
              <Text size="sm" variant="tertiary" className="mt-2">
                Enter your email address. We will verify your account before
                you set a new password.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                <Text
                  as="span"
                  size="xxs"
                  type="semibold"
                  variant="secondary"
                  className="uppercase tracking-[0.08em]"
                >
                  Email address
                </Text>
              </label>
              <InputField
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={emailFormik.values.email}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                errorMessage={formikFieldError(emailFormik, "email")}
                placeholder="name@company.com"
                icon={<FiMail className="h-[18px] w-[18px] text-gray-400" />}
                className="border-gray-200 bg-white pl-10 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="!rounded-xl !bg-brand-950 hover:!bg-brand-900 !py-3.5"
              btnName={isConfirmingEmail ? "Verifying…" : "Continue"}
              isLoading={isConfirmingEmail}
              disabled={isConfirmingEmail}
              secondaryIcon={
                !isConfirmingEmail ? (
                  <FiArrowRight className="h-5 w-5 shrink-0" />
                ) : undefined
              }
            />
          </form>
        ) : (
          <form
            onSubmit={resetFormik.handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <Text as="h2" size="xl" type="bold" className="text-brand-950">
                Set new password
              </Text>
              <Text size="sm" variant="tertiary" className="mt-2">
                Your email has been confirmed. Choose a new password for your
                account.
              </Text>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Text
                as="span"
                size="xxs"
                type="semibold"
                variant="secondary"
                className="uppercase tracking-[0.08em]"
              >
                Confirmed email
              </Text>
              <Text
                as="span"
                size="sm"
                type="semibold"
                className="mt-1 block text-brand-950"
              >
                {confirmedEmail}
              </Text>
              <button
                type="button"
                onClick={goBackToEmail}
                className="mt-2 text-left"
              >
                <Text
                  as="span"
                  size="xs"
                  type="medium"
                  className="text-brand-700 hover:text-brand-800"
                >
                  Use a different email
                </Text>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">
                <Text
                  as="span"
                  size="xxs"
                  type="semibold"
                  variant="secondary"
                  className="uppercase tracking-[0.08em]"
                >
                  New password
                </Text>
              </label>
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={resetFormik.values.password}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                errorMessage={formikFieldError(resetFormik, "password")}
                placeholder="••••••••"
                icon={<FiLock className="h-[18px] w-[18px] text-gray-400" />}
                secondaryIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <FiEye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                }
                className="border-gray-200 bg-white pl-10 pr-10 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">
                <Text
                  as="span"
                  size="xxs"
                  type="semibold"
                  variant="secondary"
                  className="uppercase tracking-[0.08em]"
                >
                  Confirm password
                </Text>
              </label>
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={resetFormik.values.confirmPassword}
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                errorMessage={formikFieldError(resetFormik, "confirmPassword")}
                placeholder="••••••••"
                icon={<FiLock className="h-[18px] w-[18px] text-gray-400" />}
                secondaryIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <FiEye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                }
                className="border-gray-200 bg-white pl-10 pr-10 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="!rounded-xl !bg-brand-950 hover:!bg-brand-900 !py-3.5"
              btnName={isResetting ? "Updating…" : "Update password"}
              isLoading={isResetting}
              disabled={isResetting}
              secondaryIcon={
                !isResetting ? (
                  <FiArrowRight className="h-5 w-5 shrink-0" />
                ) : undefined
              }
            />
          </form>
        )}
      </CardWrapper>

      <TextWithLinks
        className="mt-8"
        text="Remember your password?"
        textProps={{ size: "sm", variant: "tertiary" }}
        links={[
          {
            label: "Back to login",
            link: "/login",
            className:
              "!font-semibold !text-brand-700 hover:!text-brand-800 text-sm",
          },
        ]}
      />

      {step === "reset" ? (
        <Link
          href="/login"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-950"
        >
          <FiArrowLeft className="h-4 w-4" />
          <Text as="span" size="sm" type="medium" variant="secondary">
            Cancel
          </Text>
        </Link>
      ) : null}
    </div>
  );
}
