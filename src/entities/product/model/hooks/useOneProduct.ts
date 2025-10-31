import { useQuery } from "@tanstack/react-query";

import { productsQuery } from "../../api";

export const useOneProduct = (productId: string) =>
  useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => productsQuery.getById(productId),
  });
