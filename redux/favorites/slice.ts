import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/components/entities/Product/ui/Product.props";

import { IFavoritesInitialState } from "./types";

const initialState: IFavoritesInitialState = {
  products: [],
  isLoading: false,
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products = [...state.products, action.payload];
    },
  },
})

export const { addProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;