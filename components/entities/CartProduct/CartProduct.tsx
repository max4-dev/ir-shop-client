"use client";

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Counter } from "@/components/shared/ui";
import { useAppDispatch } from "@/redux/store";
import { addCartProduct, minusProduct, removeProduct } from "@/redux/cart/slice";

import { IProduct } from "../Product/ui/Product.props";

import { CartProductProps } from "./CartProduct.props";
import styles from "./CartProduct.module.scss";

export const CartProduct = ({
  count,
  salePercent = 0,
  price,
  categories = [],
  title,
  id,
  images,
  inStock,
  priceWithSale,
  slug,
  rating,
  className,
  ...props
}: CartProductProps) => {
  const dispatch = useAppDispatch();
  const [counterValue, setCounterValue] = useState(count);
  const product: IProduct = {
    salePercent,
    price,
    categories,
    title,
    id,
    images,
    inStock,
    priceWithSale,
    slug,
    rating,
  };

  const addToCart = () => {
    dispatch(addCartProduct(product));
  };

  const removeFromCart = () => {
    dispatch(minusProduct({ id: product.id }));
  };

  const deleteFromCart = () => {
    dispatch(removeProduct({ id: product.id }));
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
