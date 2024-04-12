import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/components/entities/Product/ui/Product.props";

import { ICartInitialState } from "./types";

const initialState: ICartInitialState = {
  products: [],
  totalCount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProduct(state, action: PayloadAction<IProduct>) {
      const findItem = state.products.find((product) => product.id === action.payload.id);
      if (!findItem) {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      } else {
        findItem.count += 1;
      }
      state.totalCount += 1;
      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.priceWithSale * obj.count + sum;
      }, 0);
    },
    minusProduct(state, action: PayloadAction<{ id: string }>) {
      const findItem = state.products.find((product) => product.id === action.payload.id);
      if (findItem && findItem.count > 1) {
        findItem.count -= 1;
        state.totalCount -= 1;
        state.totalPrice = state.products.reduce((sum, obj) => {
          return obj.priceWithSale * obj.count + sum;
        }, 0);
      }
    },
    clearProducts(state) {
      state.products = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    removeProduct(state, action: PayloadAction<{ id: string }>) {
      const deletedItem = state.products.find((product) => product.id === action.payload.id);

      if (deletedItem) {
        state.totalCount -= deletedItem.count;
        state.totalPrice -= deletedItem.priceWithSale * deletedItem.count;
      }

      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { addCartProduct, minusProduct, clearProducts, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
