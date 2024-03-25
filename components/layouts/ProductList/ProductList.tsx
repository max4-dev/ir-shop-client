import cn from "classnames";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/components/widgets";
import { Button, Pagination } from "@/components/shared/ui";
import { getProducts } from "@/components/entities/Product/handler";


import { ProductListProps } from "./ProductList.props";
import styles from './ProductList.module.scss';

export const ProductList = ({ className, ...props }: ProductListProps) => {
  const products = useQuery({queryKey: ['products'], queryFn: getProducts.getAll});

  return (
    <div className={cn(styles.productList, className)} {...props}>
      <div className={styles.productListItems}>
        {products.data && products.data.map((product) => (
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