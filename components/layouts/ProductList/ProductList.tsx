import cn from "classnames";

import { Product } from "@/components/widgets";
import { Button, Pagination } from "@/components/shared/ui";

import { ProductListProps } from "./ProductList.props";
import styles from './ProductList.module.scss';

export const ProductList = ({ className, ...props }: ProductListProps) => {
  
  return (
    <div className={cn(styles.productList, className)} {...props}>
      <div className={styles.productListItems}>
        {[...Array(9)].map((item, i) => (
          <Product className={styles.productListItem} key={i} salePercent={0} price={35} badges={['4']} />
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