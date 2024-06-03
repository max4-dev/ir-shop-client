import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFavoritesInitialState } from "./types";

const initialState: IFavoritesInitialState = {
  favoriteProducts: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<{ id: string }>) {
      state.favoriteProducts = [...state.favoriteProducts, action.payload];
    },
    removeProduct(state, action: PayloadAction<{ id: string }>) {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, removeProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
