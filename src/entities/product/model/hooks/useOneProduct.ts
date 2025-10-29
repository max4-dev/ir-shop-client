import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../handler";

export const useOneProduct = (productId: string) =>
  useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getProducts.getById(productId),
  });
