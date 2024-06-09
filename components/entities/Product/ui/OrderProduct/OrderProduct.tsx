"use client";

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { OrderProductProps } from "./OrderProduct.props";
import styles from "./OrderProduct.module.scss";

export const OrderProduct = ({
  id,
  price,
  title,
  count,
  imageUrl,
  className,
  ...props
}: OrderProductProps) => {
  return (
    <div className={cn(styles.product, className)} {...props}>
      <div className={styles.productContent}>
        <Image className={styles.productImg} src={imageUrl} width={79} height={79} alt="" />
        <h6 className={styles.productName}>
          <Link href={`product/${id}`}>{title}</Link>
        </h6>
      </div>
      <div className={styles.productCounters}>
        <span className={styles.count}>{count} шт.</span>
        <div className={styles.productPrice}>
          <span className={styles.price}>{price} ₽</span>
        </div>
      </div>
    </div>
  );
};
