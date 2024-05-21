import { useEffect, useState } from "react";

import { IProduct } from "@/components/entities/product/ui/Product/Product.props";

export const useProductsSearch = ({
  search,
  products,
}: {
  search: string;
  products: IProduct[] | undefined;
}) => {
  const [searchedProducts, setSearchedProducts] = useState(products);

  useEffect(() => {
    const searchedProducts =
      products &&
      products.filter((product: IProduct) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });

    setSearchedProducts(searchedProducts);
  }, [search, products]);

  if (search.length === 0) {
    return { searchedProducts: products };
  }

  return {
    searchedProducts,
  };
};
