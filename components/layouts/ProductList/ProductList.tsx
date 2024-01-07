import { ProductListProps } from "./ProductList.props";
import cn from "classnames";
import styles from './ProductList.module.scss';
import Product from "@/components/widgets/Product/Product";
import Button from "@/components/ui/Button/Button";
import Pagination from "@/components/ui/Pagination/Pagination";

const ProductList = ({ className, ...props }: ProductListProps) => {
  
  return (
    <div className={cn(styles.productList, className)} {...props}>
      <div className={styles.productListItems}>
        {[...Array(9)].map((item, i) => (
          <Product key={i} salePercent={0} price={35} badges={['4']} />
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
 
export default ProductList;