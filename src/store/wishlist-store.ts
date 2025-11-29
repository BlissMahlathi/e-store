import { create } from "zustand";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
};

type WishlistState = {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  toggleItem: (item) =>
    set((state) => {
      const exists = state.items.some((entry) => entry.id === item.id);
      if (exists) {
        return { items: state.items.filter((entry) => entry.id !== item.id) };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((entry) => entry.id !== id) })),
  clear: () => set({ items: [] }),
}));

export const getWishlistCount = (items: WishlistItem[]) => items.length;
