"use client"

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { OrderProductProps } from "./OrderProduct.props";
import styles from './OrderProduct.module.scss';

export const OrderProduct = ({ productId, price, className, ...props }: OrderProductProps) => {
  return (
    <div className={cn(styles.product, className)} {...props}>
      <div className={styles.productContent}>
        <Image className={styles.productImg} src="/images/products/1.jpg" width={79} height={79} alt="" />
        <h6 className={styles.productName}>
          <Link href={`product/${productId}`}>Цветы 24\24 см</Link>
        </h6>
      </div>
      <div className={styles.productCounters}>
        <span className={styles.count}>14 шт.</span>
        <div className={styles.productPrice}>
          <span className={styles.price}>{price} ₽</span>
        </div>
      </div>
    </div>
  )
}