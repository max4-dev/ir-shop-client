import { ICartStore } from "./types/cart.interface";

export const selectAddToCart = (state: ICartStore) => state.add;
export const selectRemoveFromCart = (state: ICartStore) => state.remove;
export const selectTotalCount = (state: ICartStore) => state.totalCount;
export const selectTotalPrice = (state: ICartStore) => state.totalPrice;
