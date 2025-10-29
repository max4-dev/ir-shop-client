import { client } from "@/src/shared/api";

import { productsApi } from "../api";
import { ILimitProductsResponse, ILimitQuery, IProduct } from "../model/types";

const getAll = async () => {
  const res = await client.get<IProduct[]>(productsApi.getAll);

  return res.json();
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

export const getProducts = {
  getAll,
  getByLimited,
  getBySlug,
  getById,
};
