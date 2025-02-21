import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
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

import { auth, profile } from "@/src/entities/user/model";
import { cart } from "@/src/entities/cart/model";
import { favorites } from "@/src/entities/favorites/model";
import { filter, sort, search } from "@/src/features/products-actions/model";

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


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
