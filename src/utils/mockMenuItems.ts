import type { MenuItem } from "@/lib/types";

/** Placeholder until menu API is wired in lib/apis.ts */
export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Prime Burger",
    description:
      "Angus beef patty, aged cheddar, caramelized onions, and house sauce on a brioche bun.",
    price: 14.5,
    category: "main",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    id: "m2",
    name: "Harvest Bowl",
    description:
      "Quinoa, roasted sweet potato, avocado, chickpeas, and lemon-tahini dressing.",
    price: 12,
    category: "main",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    id: "m3",
    name: "Margherita Flatbread",
    description:
      "Wood-fired flatbread with San Marzano tomato, fresh mozzarella, and basil.",
    price: 11.25,
    category: "main",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
  },
  {
    id: "m4",
    name: "Truffle Fries",
    description:
      "Crispy hand-cut fries tossed with truffle oil, parmesan, and fresh herbs.",
    price: 8,
    category: "sides",
    imageUrl:
      "https://images.unsplash.com/photo-1573080496219-b080a94509ef?w=600&q=80",
  },
  {
    id: "m5",
    name: "Iced Matcha Latte",
    description:
      "Ceremonial-grade matcha over ice with oat milk and a touch of vanilla.",
    price: 5.5,
    category: "drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1515823064-d6e0f1dff0d2?w=600&q=80",
  },
  {
    id: "m6",
    name: "Spicy Shrimp Tacos",
    description:
      "Grilled shrimp, cabbage slaw, chipotle crema, and lime on corn tortillas.",
    price: 13.75,
    category: "specials",
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
  },
  {
    id: "m7",
    name: "Chocolate Lava Cake",
    description:
      "Warm dark chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: 9.5,
    category: "desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
  },
  {
    id: "m8",
    name: "Garden Side Salad",
    description:
      "Mixed greens, cherry tomatoes, cucumber, and balsamic vinaigrette.",
    price: 6.5,
    category: "sides",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  },
];
