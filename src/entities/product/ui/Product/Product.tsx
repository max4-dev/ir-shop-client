import cn from "classnames";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";

import styles from "./Product.module.scss";
import { ProductProps } from "./Product.props";

export const Product = memo(
  ({
    product: { salePercent = 0, price, categories = [], title, id, images, priceWithSale },
    favoriteButtonSlot,
    cartButtonSlot,
    className,
    ...props
  }: ProductProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <div className={cn(styles.product, className)} ref={ref} {...props}>
        {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
        {favoriteButtonSlot && <div className={styles.productFavorite}>{favoriteButtonSlot}</div>}
        {isInView ? (
          <Image
            className={styles.productImg}
            priority={true}
            src={images[0]}
            width={182}
            height={184}
            alt=""
          />
        ) : (
          <div></div>
        )}
        <Link className={styles.productName} href={`product/${id}`}>
          {title}
        </Link>
        {categories &&
          categories.map((category) => (
            <div className={styles.productType} key={category}>
              <p className={styles.productTypeText}>Тип:</p>
              <div className={styles.productTypeBadges}>
                <span className={styles.productTypeBadge}>{category}</span>
              </div>
            </div>
          ))}
        <div className={styles.productBottom}>
          <div className={styles.productPrice}>
            {salePercent > 0 ? (
              <div className={styles.productPriceSale}>
                <span className={cn(styles.newPrice, styles.price)}>{priceWithSale} ₽</span>
                <span className={styles.oldPrice}>{price} ₽</span>
              </div>
            ) : (
              <span className={styles.price}>{price} ₽</span>
            )}
          </div>
          {cartButtonSlot && <div className={styles.productCart}>{cartButtonSlot}</div>}
        </div>
      </div>
    );
  }
);

Product.displayName = "Product";
