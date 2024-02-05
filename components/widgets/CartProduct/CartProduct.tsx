"use client"

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Counter } from "@/components/shared/ui";

import { CartProductProps } from "./CartProduct.props";
import styles from './CartProduct.module.scss';

export const CartProduct = ({ productId, salePercent = 0, price, className, ...props }: CartProductProps) => {
  const [counterValue, setCounterValue] = useState("1");

  return (
    <div className={cn(styles.product, className)} {...props}>
      <div className={styles.productContent}>
        {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
        <Image className={styles.productImg} src="/images/products/1.jpg" width={79} height={79} alt="" />
        <h6 className={styles.productName}>
          <Link href={`product/${productId}`}>Цветы 24\24 см</Link>
        </h6>
      </div>
      <div className={styles.productCounters}>
        <Counter value={String(counterValue)} setValue={setCounterValue} />
        <div className={styles.productPrice}>
          {salePercent > 0 ?
            <span className={cn(styles.price)}>{price - Math.round(price * (salePercent / 100))} ₽</span>
          : 
          <span className={styles.price}>{price} ₽</span>}
        </div>
        <button className={styles.deleteButton}>
          Удалить
        </button>
      </div>
    </div>
  )
}