import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/components/entities/product/handler";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts.getAll,
  });
};
