export interface IFavoritesStore {
  favorites: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
}