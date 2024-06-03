import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ICartInitialState, ICartProduct, IProductForCart } from "./types";

const initialState: ICartInitialState = {
  cartProducts: [],
  products: [],
  totalCount: 0,
  totalPrice: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts(state, action: PayloadAction<IProductForCart[]>) {
      state.cartProducts = action.payload;
      state.isLoading = false;
    },
    addCartProduct(state, action: PayloadAction<ICartProduct>) {
      const findItem = state.products.find((product) => product.id === action.payload.id);
      if (!findItem) {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      } else {
        findItem.count += 1;
      }
    },
    minusProduct(state, action: PayloadAction<ICartProduct>) {
      const findItem = state.products.find((product) => product.id === action.payload.id);
      if (findItem && findItem.count > 1) {
        findItem.count -= 1;
      }
    },
    setTotal(state) {
      state.totalCount = 0;
      state.totalPrice = state.cartProducts.reduce((sum, obj) => {
        state.totalCount += obj.count;
        return obj.priceWithSale * obj.count + sum;
      }, 0);
    },
    clearProducts(state) {
      state.products = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    removeProduct(state, action: PayloadAction<{ id: string }>) {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const {
  setCartProducts,
  addCartProduct,
  minusProduct,
  setTotal,
  clearProducts,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
