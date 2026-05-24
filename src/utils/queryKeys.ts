export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    outlet: (outletId: string) => ["orders", "outlet", outletId] as const,
  },
  outlets: {
    all: ["outlets"] as const,
    list: () => ["outlets", "list"] as const,
  },
  menu: {
    all: ["menu"] as const,
    list: (outletId: string) => ["menu", "list", outletId] as const,
  },
} as const;
