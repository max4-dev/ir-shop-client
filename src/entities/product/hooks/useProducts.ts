import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../handler";


export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts.getAll,
  });
