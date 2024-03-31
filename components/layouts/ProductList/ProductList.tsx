import cn from "classnames";
import { useEffect, useReducer, useState } from "react";

import { Product } from "@/components/widgets";
import { Button, Pagination } from "@/components/shared/ui";
import { sortReducer } from "@/components/widgets/Sort/sortReducer";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/components/entities/Product/ui/Product.props";
import { useAppSelector } from "@/redux/store";

import { FilterType, ProductListProps } from "./ProductList.props";
import styles from './ProductList.module.scss';

export const ProductList = ({ className, ...props }: ProductListProps) => {
  const { sort, filter } = useAppSelector(state => state.filter);
  const { data, isLoading } = useProducts();
  const [products, setProducts] = useState<IProduct[] | undefined>([]);

  // const queryClient = useQueryClient();
  // const setProducts = useCallback(
  //   v => queryClient.setQueryData(['products'], { products: v }), 
  //   [queryClient]
  // );

  const [{ products: sortedProducts }, dispatchSort] = useReducer(sortReducer, { products: data, sort: sort.type });

  const filterProducts = ({ products, filter }: FilterType) => {
    return {
      filteredProducts: products && products.filter((product: IProduct) => {
        if (filter.categories.length !== 0) {
          return filter.categories.some((category: string) => {
            return product.categories.includes(category)
          })
        }
        
        return products;
      }).filter((product: IProduct) => (
        product.priceWithSale >= filter.price[0] && product.priceWithSale <= filter.price[1]
      ))
    }
  }

  useEffect(() => {
    const { filteredProducts } = filterProducts({ products: sortedProducts, filter })
    
    return setProducts(filteredProducts);

  }, [filter, sortedProducts]);

  useEffect(() => {
    if (data) {
      dispatchSort({ type: 'reset', initialState: data })
    }
  }, [data]);

  useEffect(() => {
    dispatchSort({ type: sort.type, initialState: data });
  }, [data, sort]);

  if (!products || products.length === 0) {
    return (
      <h3 className={cn("title-b", styles.productListNotFoundTitle)}>Товары не найдены</h3>
    )
  }

  return (
    <div className={cn(styles.productList, className)} {...props}>
      <div className={styles.productListItems}>
        {products && products.map((product: IProduct) => (
          <Product
            className={styles.productListItem}
            key={product.id}
            {...product}
          />
        ))}
      </div>
      <div className={styles.productListButtonBox}>
        <Button size="big">
          Загрузить еще
        </Button>
      </div>
      <Pagination className={styles.pagination} pagesCount={50} currentPage={1} />
    </div>
  );
}