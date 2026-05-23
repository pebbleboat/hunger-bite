# HungerBite — Agent Conventions

**Always read and follow this file** when adding or changing code in **hungerBite**, unless the user explicitly overrides something in the chat.

When the user suggests a convention, pattern, or rule that should apply going forward, **add it to this document** in the same PR/change set (keep sections concise).

Use this document when adding or changing code in **hungerBite** (product name: **HungerBite**). Follow these rules unless the user explicitly asks otherwise.

## App context

| Item | Value |
|------|--------|
| Framework | Next.js 16 (App Router) |
| Dev port | `3010` (`npm run dev` → `next dev -p 3010 --webpack`) |
| Path alias | `@/*` → `./src/*` |
| Order API | `NEXT_PUBLIC_ORDER_URL` / `NEXT_PUBLIC_ORDER_API_URL` (default `http://127.0.0.1:8081`) |
| Auth API | `NEXT_PUBLIC_AUTH_API_URL` (default `http://localhost:8080`) |
| Auth role | Always **`customer`** — never show a role field on login/signup |

---

## Project layout (`src/`)

```
src/
├── app/
│   ├── layout.tsx              # Root layout; providers inside <body>
│   ├── (auth)/                 # Route group (no URL segment)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   ├── page.tsx        # Route UI — must be page.tsx
│   │   │   └── useHook.ts      # Logic, mutations, formik
│   │   └── signup/
│   │       ├── page.tsx
│   │       └── useHook.ts
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx            # Imports feature component
│   ├── selectOutlet/           # Select outlet feature (not a route)
│   │   ├── index.tsx
│   │   ├── useHook.ts
│   │   └── components/
│   ├── menu/                   # Menu + cart after outlet selected
│   │   ├── index.tsx
│   │   ├── useHook.ts
│   │   └── components/
│   └── orderForm/              # Legacy order form module
│       ├── index.tsx
│       └── useHook.ts
├── components/                 # App-level components (auth shell, providers, …)
├── shared/                     # Reusable UI (Button, InputField, Text, …)
├── lib/
│   ├── apiConstant.ts          # Base URLs + path builders + HUNGERBITE_AUTH_ROLE
│   ├── axiosInstance.ts        # Single axios client + Bearer interceptor
│   ├── apis.ts                 # All HTTP functions (orders + auth)
│   └── types.ts                # API payload/response types
├── utils/
│   ├── schema.ts               # Formik initial values + Yup schemas
│   ├── authSession.ts          # Token in cookie + localStorage
│   ├── formikFieldError.ts
│   ├── queryKeys.ts
│   └── enum.ts                 # storageKeys, etc.
├── styles/globals.css
└── middleware.ts               # Auth guard
```

---

## Feature folder structure

For each feature (e.g. `orderForm`, `(auth)/login`):

1. **`page.tsx`** — route entry (App Router). **Do not** use `index.tsx` for routes under `app/`; only `page.tsx` creates a URL.
2. **`useHook.ts`** — business logic: Formik, React Query (`useQuery` / `useMutation`), handlers, derived state. Export a `useHook()` (or named hook) consumed by the page.
3. **`index.tsx`** — only for **non-route** feature UI imported by `(dashboard)/page.tsx` or similar.

**Split rule:** If `page.tsx` (or feature `index.tsx`) grows beyond **~250 lines**, extract presentational pieces into `components/` or `shared/`.

**Typography (required):**

- Use **`@/shared/heading/Text.tsx`** for all user-visible copy: titles, subtitles, labels, helper text, links text, footers, etc.
- Use **`TextWithLinks`** when a line mixes plain text + one or more links (e.g. “Don’t have an account? **Contact Sales**”).
- Set semantic elements via `as` (`h1`, `span`, `p`, …). For form labels with `htmlFor`, use `<label htmlFor="…"><Text as="span">…</Text></label>`.
- Do **not** use raw `<h1>`, `<p>`, or styled `<span>` for UI text.
- Use `size`, `type`, and `variant` props first; add `className` only for layout or colors not covered by variants (e.g. `text-brand-950`).

**Auth login layout:** Centered page with header (logo + title + subtitle) + **`CardWrapper`** for the form card + footer `TextWithLinks`. See `(auth)/login/page.tsx`.

---

## API layer

- **Direct browser calls** to backend services. Do **not** use Next.js rewrites/proxy for API traffic.
- **One** axios instance: `lib/axiosInstance.ts` (JSON headers + `Authorization: Bearer` from cookie when present).
- **Per-request `baseURL`** in `lib/apis.ts` because auth (`8080`) and order (`8081`) hosts differ:

```ts
await axiosInstance.post(AUTH_PATHS.login, payload, { baseURL: AUTH_API_BASE_URL });
await axiosInstance.get(API_PATHS.outletOrders(id), { baseURL: ORDER_API_BASE_URL });
```

- **All HTTP functions** live in **`lib/apis.ts` only**. Do not add `src/apis/apis.ts` or a second axios client.
- Path builders and env defaults live in **`lib/apiConstant.ts`**.

---

## React Query

- Use **`useQuery` / `useMutation` inline inside each feature’s `useHook.ts`**.
- Do **not** create separate files under `hooks/api/` (e.g. `useAuthMutations.ts`, `useOrderQueries.ts`).
- Shared query key strings: `utils/queryKeys.ts`.

---

## Forms (Formik + Yup)

- Schemas and `initialValues` in **`utils/schema.ts`**.
- Field errors via **`formikFieldError(formik, "fieldName")`**.
- Auth forms: email + password only (signup adds name). Role is **not** in the form; send `role: HUNGERBITE_AUTH_ROLE` (`"customer"`) in the mutation payload.

---

## Auth & navigation flow

- Public routes: `/login`, `/signup`, `/forgot-password` (listed in `middleware.ts`).
- Unauthenticated users → redirect to `/login`.
- **After login** → `/select-outlet` (not `/`).
- **After outlet selected** → `/menu` (outlet stored via `utils/outletSession.ts`).
- Authenticated users on `/login` or `/signup` → `/select-outlet` or `/menu` if outlet cookie exists.
- `/` redirects to `/select-outlet` or `/menu` when logged in.
- `/menu` without selected outlet → `/select-outlet`.
- Session: `utils/authSession.ts` (cookie + localStorage). Clear outlet on logout.
- Login UI: centered layout + `CardWrapper` + `Text` / `TextWithLinks` (see `(auth)/login/page.tsx`).
- **Forgot password** (`/forgot-password`): step 1 confirm email → step 2 new password + confirm password. APIs: `requestPasswordReset`, `resetPassword` in `lib/apis.ts` (`AUTH_PATHS.forgotPassword`, `resetPassword`). Link from login “Forgot Password?”.

## Select outlet screen

- Route: `/select-outlet` → `(dashboard)/select-outlet/page.tsx` → `@/app/selectOutlet`.
- UI: `HungerBiteNavbar` + welcome header + `FilterBar` + outlet grid (`FeaturedOutletCard`, `OutletCard`).
- Mock data: `utils/mockOutlets.ts` until outlet APIs are added to `lib/apis.ts`.
- Uses `useQuery` in `selectOutlet/useHook.ts`; swap `fetchOutlets` when API is ready.
- Dashboard layout skips `PageWrapper` for `/select-outlet` and `/menu` (custom shell).

## Menu screen (`/menu`)

- Route: `(dashboard)/menu/page.tsx` → `@/app/menu`.
- Layout: `HungerBiteNavbar` (search placeholder **Search menu**, Home active) + category chips + **3-column menu grid** + **CartSidebar** (~380px).
- Mock data: `utils/mockMenuItems.ts`; swap `fetchMenuItems` in `menu/useHook.ts` when API is ready.
- Cart state is local in `useHook` until order APIs exist; all copy via `Text`.
- Components: `MenuCategoryFilters`, `MenuItemCard` (`CardWrapper`), `CartSidebar`.
- **Review Order** → `/finish-order`; cart persisted in `utils/cartSession.ts`.

## Finish order screen (`/finish-order`)

- Route: `(dashboard)/finish-order/page.tsx` → `@/app/finishOrder`.
- Opened from menu **Review Order**; redirects to `/menu` if cart is empty.
- Layout: navbar (Orders active, search **Search orders…**), back + **Review Your Order** title, two columns.
- Left: `ItemsForReviewCard` (qty stepper + remove; syncs `cartSession`), `OrderInstructionsCard` (textarea). **No payment method UI.**
- Right: `OrderDetailsCard`, `OrderTotalCard` (navy, Place Order).
- `placeOrder` in `useHook.ts` is stubbed until order API is wired; on success → `/order-status`, cart cleared, snapshot in `utils/orderSession.ts`.

## Order status screen (`/order-status`)

- Route: `(dashboard)/order-status/page.tsx` → `@/app/orderStatus`.
- After **Place Order** on finish-order (successful payment flow).
- Redirects to `/menu` if no `placed_order` in localStorage.
- Navbar: **Orders** active, search **Track another order…**
- Main: `OrderStatusHeroCard` (stepper, ETA, Need Help), `PickupLocationCard`, `PickupInstructionsCard`.
- Sidebar: read-only cart summary + history/saved/settings links. **No payment method UI.**
- Mock tracking data: `utils/mockOrderStatus.ts`; swap when order status API exists.

---

## Root layout & hydration

- **`ReactQueryClientProvider`**, **`ToastProvider`**, and other client providers must be **children of `<body>`**, not siblings of `<body>` under `<html>`.

---

## Styling

- Global styles: `src/styles/globals.css` (Tailwind v4 `@import "tailwindcss"`).
- App uses **light UI** (`color-scheme: light`); avoid `prefers-color-scheme: dark` flipping `--foreground` to light text on white cards.
- Form controls: explicit `text-gray-900` / `placeholder:text-gray-400` on inputs (see `shared/input/InputField.tsx`).
- Do not `@import` optional CSS files (e.g. `slick.css`) unless the file exists and is required.

---

## Shared UI

Reuse before creating new primitives:

- `shared/cards/CardWrapper.tsx` — white bordered card (auth forms, panels)
- `shared/cart/CartLineItem.tsx` — cart row (`size`: `sm` menu sidebar, `md` finish-order default)
- `shared/buttons/Button.tsx`
- `shared/input/InputField.tsx`, `Dropdown.tsx`
- `shared/heading/Text.tsx`, `TextWithLinks.tsx` — **required for text**
- `shared/divider/DividerWithText.tsx`
- `shared/popover/MenuPopover.tsx` — profile avatar menu, dropdowns

## Profile screen (`/profile`)

- Route: `(dashboard)/profile/page.tsx` → `@/app/profile`.
- Navbar **Profile** active; avatar popover → **My Profile** / **Logout**.
- Layout: left sidebar (summary + order stats), right column (personal info + deactivate).
- User data: `utils/mockProfile.ts` merged with `CURRENT_USER` from localStorage until profile API exists.
- Placeholder actions (Edit, Trust, Notifications, Deactivate) toast “coming soon” for now.

---

## Code quality

- **Minimal diff** — only change what the task needs.
- **Match existing patterns** — naming, imports, file placement.
- **No over-abstraction** — no one-line helpers unless reused.
- **Comments** only for non-obvious business logic.
- **Tests** only when asked or when they add real coverage.

---

## Git

- Do **not** commit unless the user explicitly asks.

---

## Quick checklist (new feature)

- [ ] Route uses `app/.../page.tsx` + `useHook.ts`
- [ ] API call added to `lib/apis.ts` with correct `baseURL`
- [ ] Yup schema in `utils/schema.ts` if there is a form
- [ ] React Query in `useHook.ts`, not a separate hooks file
- [ ] Auth role `"customer"` for login/signup payloads
- [ ] `Text` / `TextWithLinks` for all visible copy (no raw headings/paragraphs)
- [ ] Shared components for inputs/buttons/cards
