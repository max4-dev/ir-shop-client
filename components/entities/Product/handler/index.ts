import { cache } from "react";

import axios from "@/core/axios";

import { productsApi } from "../api";
import { ILimitQuery } from "../types";
import { ILimitProductsResponse, IProduct } from "../ui/Product/Product.props";

const getAll = cache(async () => {
  const res = await axios.get<IProduct[]>(productsApi.getAll);

  return res.data;
});

const getByLimited = cache(async (query: ILimitQuery) => {
  const res = await axios.get<ILimitProductsResponse>(productsApi.byLimited(query));

  return res.data;
});

const getBySlug = cache(async (slug: string) => {
  const res = await axios.get<IProduct[]>(productsApi.bySlug(slug));

  return res.data;
});

const getById = cache(async (id: string) => {
  const res = await axios.get<IProduct>(productsApi.byId(id));

  return res.data;
});

export const getProducts = {
  getAll,
  getByLimited,
  getBySlug,
  getById,
};
