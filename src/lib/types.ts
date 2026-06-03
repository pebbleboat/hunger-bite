export type CatalogOutletRecord = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  status?: string;
  isAcceptingOrders?: boolean;
  rating?: number;
  image?: string;
  location?: { distance?: number };
  schedule?: { startTime?: string; endTime?: string };
};

export type CatalogMenuItemRecord = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  status?: string;
  category?: string;
  image?: string;
  dietary?: string;
};

export type Outlet = {
  id: string;
  name: string;
  description: string;
  rating: number;
  distanceMiles: number;
  openUntil: string;
  imageUrl: string;
  featured?: boolean;
};

export type OutletFilterId =
  | "nearby"
  | "top-rated"
  | "cuisine"
  | "more-filters";

export type MenuCategoryId = "all" | string;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dietary?: string;
  rating?: number;
};

export type CartLine = {
  item: MenuItem;
  quantity: number;
  note?: string;
};

export type CartDraft = {
  lines: CartLine[];
  instructions?: string;
};

export type OrderStatusStage =
  | "acceptance_pending"
  | "preparing"
  | "ready"
  | "collected";

export type OrderStatusStepState = "done" | "current" | "upcoming";

export type OrderStatusStep = {
  id: OrderStatusStage;
  label: string;
  caption: string;
  state: OrderStatusStepState;
};

export type PlacedOrder = {
  orderNumber: string;
  status: OrderStatusStage;
  statusLabel: string;
  headline: string;
  cartLines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
  instructions?: string;
  outletName: string;
  pickupLocation: string;
  estimatedArrival: string;
  currentWait: string;
  steps: OrderStatusStep[];
};

export type CreateOrderLinePayload = {
  id: string;
  quantity: number;
};

export type CreateOrderPayload = {
  items: CreateOrderLinePayload[];
};

export type OrderRow = {
  id: string;
  items: CreateOrderLinePayload[];
  status?: string;
  outletId?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  role: string;
};

export type ForgotPasswordPayload = {
  email: string;
  role: string;
};

export type ResetPasswordPayload = {
  email: string;
  password: string;
  role: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
  outletId?: number;
};

export type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  memberSince: string;
  initials: string;
  activeOrders: number;
  totalDelivered: number;
};
