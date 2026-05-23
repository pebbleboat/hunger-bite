"use client";

import Button from "@/shared/buttons/Button";
import CardWrapper from "@/shared/cards/CardWrapper";
import DividerWithText from "@/shared/divider/DividerWithText";
import Text from "@/shared/heading/Text";
import TextWithLinks from "@/shared/heading/TextWithLinks";
import InputField from "@/shared/input/InputField";
import { formikFieldError } from "@/utils/formikFieldError";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useHook } from "./useHook";

export default function LoginPage() {
  const { formik, isSubmitting } = useHook();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-white to-brand-50 px-4 py-12">
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
          Order food from your favorite outlets
        </Text>
      </header>

      <CardWrapper className="w-full max-w-[420px] border-gray-200 p-8 shadow-[0_12px_40px_rgba(15,35,80,0.08)]">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formikFieldError(formik, "email")}
              placeholder="name@company.com"
              icon={<FiMail className="h-[18px] w-[18px] text-gray-400" />}
              className="border-gray-200 bg-white pl-10 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="password">
                <Text
                  as="span"
                  size="xxs"
                  type="semibold"
                  variant="secondary"
                  className="uppercase tracking-[0.08em]"
                >
                  Password
                </Text>
              </label>
              <Link href="/forgot-password">
                <Text
                  as="span"
                  size="xs"
                  type="medium"
                  className="text-brand-700 hover:text-brand-800"
                >
                  Forgot Password?
                </Text>
              </Link>
            </div>
            <InputField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formikFieldError(formik, "password")}
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

          <Button
            type="submit"
            fullWidth
            size="lg"
            className="!rounded-xl !bg-brand-950 hover:!bg-brand-900 !py-3.5"
            btnName={isSubmitting ? "Signing in…" : "Login"}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            secondaryIcon={
              !isSubmitting ? (
                <FiArrowRight className="h-5 w-5 shrink-0" />
              ) : undefined
            }
          />

          <DividerWithText text="OR" className="my-1" />

          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="lg"
            className="!rounded-xl !border-gray-200 !py-3.5 !font-medium !text-gray-700"
            icon={<FcGoogle className="h-5 w-5 shrink-0" />}
            btnName="Continue with Google"
            onClick={() => {}}
          />
        </form>
      </CardWrapper>

      <TextWithLinks
        className="mt-8"
        text="Don't have an account yet?"
        textProps={{ size: "sm", variant: "tertiary" }}
        links={[
          {
            label: "Contact Sales",
            link: "/signup",
            className:
              "!font-semibold !text-brand-700 hover:!text-brand-800 text-sm",
          },
        ]}
      />
    </div>
  );
}
