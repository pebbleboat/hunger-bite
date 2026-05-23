import type { PlacedOrder } from "@/lib/types";

/** Default status UI until order tracking API is wired */
export const MOCK_ORDER_STATUS: Omit<
  PlacedOrder,
  "cartLines" | "subtotal" | "tax" | "total" | "instructions" | "outletName"
> = {
  orderNumber: "OP-99284-K",
  status: "preparing",
  statusLabel: "PREPARING",
  headline: "Your order is being prepared",
  pickupLocation: "Store #42 • Downtown Hub",
  estimatedArrival: "12:45 PM – 1:00 PM",
  currentWait: "~2 Mins",
  steps: [
    {
      id: "acceptance_pending",
      label: "Acceptance Pending",
      caption: "12:30 PM",
      state: "done",
    },
    {
      id: "preparing",
      label: "Preparing",
      caption: "In Progress",
      state: "current",
    },
    {
      id: "ready",
      label: "Ready",
      caption: "Est. 12:55",
      state: "upcoming",
    },
    {
      id: "collected",
      label: "Collected",
      caption: "--:--",
      state: "upcoming",
    },
  ],
};
