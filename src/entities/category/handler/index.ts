import { cache } from "react";

import { axiosInstance } from "@/src/shared/lib";

import { ICategory } from "../types";
import { categoryApi } from "../api";

const getAll = cache(async () => {
  const res = await axiosInstance.get<ICategory[]>(categoryApi.getAll);

  return res.data;
});

export const getCategories = {
  getAll,
};
