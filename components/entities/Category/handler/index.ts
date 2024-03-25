import { cache } from "react";

import axios from "@/core/axios";

import { ICategory } from "../types";
import { categoryApi } from "../api";

const getAll = cache(async () => {
  const res = await axios.get<ICategory[]>(
    categoryApi.getAll
  );
  
  return res.data;
});

export const getCategories = {
  getAll,
};
