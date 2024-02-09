import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { ProductProps } from "./Product.props";
import styles from './Product.module.scss';

export const Product = ({ salePercent = 0, price, badges = [], className, ...props }: ProductProps) => {

  return (
    <div className={cn(styles.product, className)} {...props}>
      {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
      <button className={styles.productFavorite}>
        <Image src='/images/icons/favorite.svg' alt="Корзина" width={26} height={23} />
      </button>
      <Image className={styles.productImg} src="/images/products/1.jpg" width={198} height={184} alt="" />
      <Link className={styles.productName} href={`product/${4}`}>Цветы 24\24 см</Link>
      {badges.length > 0 && <div className={styles.productType}>
        <p className={styles.productTypeText}>Тип:</p>
        <div className={styles.productTypeBadges}>
          <span className={styles.productTypeBadge}>
            цветы
          </span>
          <span className={styles.productTypeBadge}>
            цветы
          </span>
        </div>
      </div>}
      <div className={styles.productBottom}>
        <div className={styles.productPrice}>
          {salePercent > 0 ?
          <div className={styles.productPriceSale}>
            <span className={cn(styles.newPrice, styles.price)}>{price - Math.round(price * (salePercent / 100))} ₽</span>
            <span className={styles.oldPrice}>{price} ₽</span>
          </div> 
          : 
          <span className={styles.price}>{price} ₽</span>}
        </div>
        <button className={styles.productCartButton}>
          <Image src='/images/icons/cart.svg' alt="Корзина" width={23} height={23} />
        </button>
      </div>
    </div>
  )
}