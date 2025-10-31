import { useCartStore } from "../store";

export const useCartItem = (id: string) =>
  useCartStore((state) => state.items.find((product) => product.id === id));
