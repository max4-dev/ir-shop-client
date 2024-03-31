import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/components/entities/Product/handler";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts.getAll,
  });