import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getStoreLocalString } from "@/helpers/getStoreLocal";

import { ICityInitialState } from "./types";

const initialState: ICityInitialState = {
  address: getStoreLocalString("address") || "Москва",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      localStorage.setItem("address", action.payload);
      state.address = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
