import { useEffect, useState } from "react";

import { IProduct } from "@/src/entities/product/types";

import { IFilter } from "../../../shared/types";

export type FilterType = {
  products: IProduct[] | undefined;
  filter: IFilter;
};

export const useProductsFilter = ({ products, filter }: FilterType) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filteredProducts =
      products &&
      products
        .filter((product: IProduct) => {
          if (filter.categories.length !== 0) {
            return filter.categories.some((category: string) => {
              return product.categories && product.categories.includes(category);
            });
          }

          return products;
        })
        .filter((product: IProduct) => {
          return (
            product.priceWithSale >= filter.price[0] && product.priceWithSale <= filter.price[1]
          );
        });

    setFilteredProducts(filteredProducts);
  }, [products, filter]);

  return {
    filteredProducts,
  };
};
