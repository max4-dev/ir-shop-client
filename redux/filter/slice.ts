import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { defaultPrice } from "@/helpers/const/defaultPrice";

import { IFilter, IFilterInitialState, SortEnum, SortType } from "./types";

const initialState: IFilterInitialState = {
  sort: {
    name: 'Новизне',
    type: SortEnum.Default,
  },
  filter: {
    categories: [],
    price: defaultPrice,
  },
  isLoading: false,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setFilter(state, action: PayloadAction<IFilter>) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
})

export const { setSort, setFilter } = filterSlice.actions;
export default filterSlice.reducer;