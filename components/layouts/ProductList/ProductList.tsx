import { ProductListProps } from "./ProductList.props";
import cn from "classnames";
import styles from './ProductList.module.scss';
import Product from "@/components/widgets/Product/Product";

const ProductList = ({ className, ...props }: ProductListProps) => {
  
  return (
    <div className={cn(styles.productList, className)} {...props}>
      {[...Array(9)].map((item, i) => (
        <Product key={i} />
      ))}
    </div>
  );
}
 
export default ProductList;