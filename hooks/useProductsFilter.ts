import { useEffect, useState } from "react";

import { IProduct } from "@/components/entities/product/ui/Product/Product.props";
import { FilterType } from "@/components/layouts/ProductList/ProductList.props";

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
