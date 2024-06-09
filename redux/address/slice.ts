import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DaDataAddress, DaDataSuggestion } from "react-dadata";

import { getStoreLocal } from "@/helpers/getStoreLocal";

import { ICityInitialState } from "./types";

const initialState: ICityInitialState = {
  address: getStoreLocal("address") || { value: "Москва" },
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<DaDataSuggestion<DaDataAddress>>) {
      localStorage.setItem("address", JSON.stringify(action.payload));
      state.address = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
