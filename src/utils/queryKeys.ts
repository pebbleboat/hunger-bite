export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    outlet: (outletId: string) => ["orders", "outlet", outletId] as const,
  },
  outlets: {
    list: (filter: string, search: string) =>
      ["outlets", "list", filter, search] as const,
  },
  menu: {
    list: (outletId: string, category: string, search: string) =>
      ["menu", "list", outletId, category, search] as const,
  },
} as const;
