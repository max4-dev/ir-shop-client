import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth/slice";
import profile from "./profile/slice";
import filter from "./filter/slice";
import sort from "./sort/slice";
import search from "./search/slice";
import favorites from "./favorites/slice";
import cart from "./cart/slice";
import address from "./address/slice";

import type { TypedUseSelectorHook } from "react-redux";

const persistConfig = {
  key: "ir-shop",
  storage,
  whitelist: ["favorites", "cart"],
};

const rootReducer = combineReducers({
  user: auth,
  profile,
  filter,
  sort,
  search,
  favorites,
  cart,
  address,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
