import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { ProductProps } from "./Product.props";
import styles from './Product.module.scss';

export const Product = ({ salePercent = 0, price, categories = [], title, id, images, inStock, priceWithSale, className, ...props }: ProductProps) => {
  return (
    <div className={cn(styles.product, className)} {...props}>
      {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
      <button className={styles.productFavorite}>
        <Image src='/images/icons/favorite.svg' alt="Корзина" width={26} height={23} />
      </button>
      <Image
        className={styles.productImg}
        src={images[0]}
        width={198}
        height={184}
        alt="" 
      />
      <Link
        className={styles.productName}
        href={`product/${id}`}
      >
        {title}
      </Link>
      {categories && categories.map(category => (
        <div className={styles.productType} key={category}>
          <p className={styles.productTypeText}>Тип:</p>
          <div className={styles.productTypeBadges}>
            <span className={styles.productTypeBadge}>
              {category}
            </span>
          </div>
        </div>
      ))
      }
      <div className={styles.productBottom}>
        <div className={styles.productPrice}>
          {salePercent > 0 ?
          <div className={styles.productPriceSale}>
            <span className={cn(styles.newPrice, styles.price)}>{priceWithSale} ₽</span>
            <span className={styles.oldPrice}>{price} ₽</span>
          </div>
          : 
          <span className={styles.price}>{price} ₽</span>}
        </div>
        {inStock && <button className={styles.productCartButton}>
          <Image src='/images/icons/cart.svg' alt="Корзина" width={23} height={23} />
        </button>}
      </div>
    </div>
  )
}