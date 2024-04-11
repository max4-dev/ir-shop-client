import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/components/entities/Product/ui/Product.props";

import { IFavoritesInitialState } from "./types";

const initialState: IFavoritesInitialState = {
  products: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products = [...state.products, action.payload];
    },
    removeProduct(state, action: PayloadAction<{ id: string }>) {
      state.products = state.products.filter(product => product.id !== action.payload.id)
    },
  },
})

export const { addProduct, removeProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;