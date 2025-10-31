import { create } from "zustand";

import { ICartStore } from "./types/cart.interface";

export const useCartStore = create<ICartStore>((set) => ({
  items: [],
  totalCount: 0,
  totalPrice: 0,
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  remove: (itemId) => set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
}));
