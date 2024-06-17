import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { defaultPrice } from "@/helpers/const/defaultPrice";

import { IFilter, IFilterInitialState } from "./types";

const initialState: IFilterInitialState = {
  filter: {
    categories: [],
    price: defaultPrice,
  },
  activePage: 1,
  catalogCountPages: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<IFilter>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setCatalogCountPages(state, action: PayloadAction<number>) {
      state.catalogCountPages = action.payload;
    },
  },
});

export const { setFilter, setActivePage, setCatalogCountPages } = filterSlice.actions;
export default filterSlice.reducer;
