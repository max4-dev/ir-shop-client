import { create } from "zustand";

import { IFavoritesStore } from "./types/favorites.interface";

export const useFavoritesStore = create<IFavoritesStore>((set) => ({
  favorites: [],
  add: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
  remove: (id) =>
    set((state) => ({ favorites: state.favorites.filter((favorite) => favorite !== id) })),
}));
