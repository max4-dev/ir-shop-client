import { cache } from "react";

import { axiosInstance } from "@/src/shared/lib";

import { productsApi } from "../api";
import { ILimitProductsResponse, ILimitQuery, IProduct } from "../types";

const getAll = cache(async () => {
  const res = await axiosInstance.get<IProduct[]>(productsApi.getAll);

  return res.data;
});

const getByLimited = cache(async (query: ILimitQuery) => {
  const res = await axiosInstance.get<ILimitProductsResponse>(productsApi.byLimited(query));

  return res.data;
});

const getBySlug = cache(async (slug: string) => {
  const res = await axiosInstance.get<IProduct[]>(productsApi.bySlug(slug));

  return res.data;
});

const getById = cache(async (id: string) => {
  const res = await axiosInstance.get<IProduct>(productsApi.byId(id));

  return res.data;
});

export const getProducts = {
  getAll,
  getByLimited,
  getBySlug,
  getById,
};
