import { IFavoritesStore } from "./types/favorites.interface";

export const selectAddFavorite = (state: IFavoritesStore) => state.add;
export const selectRemoveFavorite =(state: IFavoritesStore) => state.remove;
