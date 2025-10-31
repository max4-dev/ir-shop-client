import { client } from "@/src/shared/api";

import { ILimitProductsResponse, ILimitQuery, IProduct } from "../model/types/product.interface";

import { productsApi } from "./api";

const getAll = async () => {
  const res = await client.get<IProduct[]>(productsApi.all).json();

  return res;
};

const getByLimited = async (query: ILimitQuery) => {
  const res = await client.get<ILimitProductsResponse>(productsApi.byLimited(query)).json();

  return res;
};

const getBySlug = async (slug: string) => {
  const res = await client.get<IProduct[]>(productsApi.bySlug(slug)).json();

  return res;
};

const getById = async (id: string) => {
  const res = await client.get<IProduct>(productsApi.byId(id)).json();

  return res;
};

export const productsQuery = {
  getAll,
  getByLimited,
  getBySlug,
  getById,
};
