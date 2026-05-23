"use client";

import { Fragment } from "react";

import Text from "@/shared/heading/Text";
import type { OrderStatusStep } from "@/lib/types";
import clsx from "clsx";
import {
  FiCheckCircle,
  FiClipboard,
  FiShoppingBag,
  FiShoppingCart,
} from "react-icons/fi";

const STEP_ICONS = {
  acceptance_pending: FiClipboard,
  preparing: FiShoppingCart,
  ready: FiShoppingBag,
  collected: FiCheckCircle,
} as const;

const TEAL = "#0f766e";
const TEAL_LIGHT = "#5eead4";

type ConnectorVariant = "progress" | "complete" | "inactive";

const getConnectorVariant = (
  prev: OrderStatusStep,
  next: OrderStatusStep,
): ConnectorVariant => {
  if (prev.state === "done" && next.state === "current") return "progress";
  if (prev.state === "done" && next.state === "done") return "complete";
  return "inactive";
};

type StepConnectorProps = {
  variant: ConnectorVariant;
};

const StepConnector = ({ variant }: StepConnectorProps) => {
  if (variant === "progress") {
    return (
      <div className="flex flex-1 items-center self-start pt-[26px]" aria-hidden>
        <div
          className="stepper-progress-stripes h-1.5 w-full rounded-full"
          style={{
            backgroundColor: TEAL,
            backgroundImage: `repeating-linear-gradient(
              -55deg,
              ${TEAL_LIGHT} 0,
              ${TEAL_LIGHT} 6px,
              ${TEAL} 6px,
              ${TEAL} 14px
            )`,
            backgroundSize: "28px 100%",
          }}
        />
      </div>
    );
  }

  if (variant === "complete") {
    return (
      <div className="flex flex-1 items-center self-start pt-6" aria-hidden>
        <div className="h-2 w-full rounded-full bg-teal-700" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center self-start pt-7" aria-hidden>
      <div className="h-0.5 w-full rounded-full bg-gray-200" />
    </div>
  );
};

type OrderStatusStepperProps = {
  steps: OrderStatusStep[];
};

const OrderStatusStepper = ({ steps }: OrderStatusStepperProps) => {
  return (
    <div
      className="flex w-full items-start pb-14"
      role="list"
      aria-label="Order progress"
    >
      {steps.map((step, index) => {
        const Icon = STEP_ICONS[step.id];
        const isDone = step.state === "done";
        const isCurrent = step.state === "current";
        const isActive = isDone || isCurrent;
        const connectorVariant =
          index > 0
            ? getConnectorVariant(steps[index - 1], step)
            : "inactive";

        return (
          <Fragment key={step.id}>
            {index > 0 ? <StepConnector variant={connectorVariant} /> : null}
            <div
              className="relative flex h-14 w-14 shrink-0 flex-col items-center"
              role="listitem"
            >
              <div
                className={clsx(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  isActive && "bg-teal-700",
                  !isActive && "bg-gray-200",
                  isCurrent &&
                    "shadow-[0_0_0_4px_rgba(94,234,212,0.95)]",
                )}
              >
                <Icon
                  className={clsx(
                    "h-6 w-6",
                    isActive ? "text-white" : "text-gray-500",
                  )}
                />
              </div>
              <div className="absolute left-1/2 top-[64px] w-28 -translate-x-1/2 text-center">
                <Text
                  as="span"
                  size="xs"
                  type="semibold"
                  className={clsx(
                    "block leading-snug",
                    isActive ? "text-brand-950" : "text-gray-400",
                  )}
                >
                  {step.label}
                </Text>
                <Text
                  as="span"
                  size="xxs"
                  className={clsx(
                    "mt-1 block leading-tight",
                    isCurrent && "font-semibold text-teal-700",
                    !isCurrent && "text-gray-500",
                  )}
                >
                  {step.caption}
                </Text>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusStepper;
