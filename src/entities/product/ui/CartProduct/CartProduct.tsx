"use client";

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


import { useAppDispatch } from "@/src/shared/hooks";
import { addCartProduct, minusProduct, removeProduct } from "@/src/entities/cart/model";
import { Counter } from "@/src/shared/ui";

import { CartProductProps } from "./CartProduct.props";
import styles from "./CartProduct.module.scss";

export const CartProduct = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inStock,
  count,
  salePercent = 0,
  price,
  title,
  id,
  images,
  priceWithSale,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createdAt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatedAt,
  className,
  ...props
}: CartProductProps) => {
  const dispatch = useAppDispatch();
  const [counterValue, setCounterValue] = useState(count);

  const addToCart = () => {
    dispatch(addCartProduct({ id, count: counterValue }));
  };

  const removeFromCart = () => {
    dispatch(minusProduct({ id, count: counterValue }));
  };

  const deleteFromCart = () => {
    dispatch(removeProduct({ id }));
  };

  return (
    <div className={cn(styles.product, className)} {...props}>
      <div className={styles.productContent}>
        {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
        <Image className={styles.productImg} src={images[0]} width={79} height={79} alt="" />
        <h6 className={styles.productName}>
          <Link href={`product/${id}`}>{title}</Link>
        </h6>
      </div>
      <div className={styles.productCounters}>
        <Counter
          className={styles.productCounter}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          value={counterValue}
          setValue={setCounterValue}
        />
        <div className={styles.productPrice}>
          {salePercent > 0 ? (
            <span className={cn(styles.price)}>{priceWithSale * count} ₽</span>
          ) : (
            <span className={styles.price}>{price * count} ₽</span>
          )}
        </div>
        <button onClick={deleteFromCart} className={styles.deleteButton}>
          Удалить
        </button>
      </div>
    </div>
  );
};
