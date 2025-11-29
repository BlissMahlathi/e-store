import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((entry) => entry.id === item.id);
      if (existing) {
        return {
          items: state.items.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((entry) => entry.id !== id) })),
  increment: (id) =>
    set((state) => ({
      items: state.items.map((entry) => (entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)),
    })),
  decrement: (id) =>
    set((state) => ({
      items: state.items
        .map((entry) => (entry.id === id ? { ...entry, quantity: entry.quantity - 1 } : entry))
        .filter((entry) => entry.quantity > 0),
    })),
  clear: () => set({ items: [] }),
}));

export const useCartSummary = () =>
  useCartStore((state) => ({
    count: state.items.reduce((acc, item) => acc + item.quantity, 0),
    total: state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  }));
