import { useFavoritesStore } from "../store";

export const useIsFavorite = (id: string) =>
  useFavoritesStore((state) => state.favorites.includes(id));
