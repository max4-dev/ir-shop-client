import { useQuery } from "@tanstack/react-query";

import { productsQuery } from "../../api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productsQuery.getAll,
  });
