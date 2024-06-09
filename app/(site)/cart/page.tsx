"use client";

import cn from "classnames";
import { useState } from "react";

import { CartProduct } from "@/components/entities/product/ui";
import { Button, Icon, Loader } from "@/components/shared/ui";
import { useAppDispatch } from "@/redux/store";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { clearProducts } from "@/redux/cart/slice";
import { CartPopup } from "@/components/features/order";
import { useAuth } from "@/hooks/useAuth";

import styles from "./Cart.module.scss";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cartProducts, isLoading, totalCount, totalPrice } = useTypedSelector(
    (state) => state.cart
  );

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (cartProducts.length === 0) {
    return (
      <div className="container">
        <h3 className={cn("title-b", styles.cartNotFoundTitle)}>Корзина пуста</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className={cn(styles.cartTitle, "title-b")}>Оформление заказа</h2>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <Icon.CartWhiteIcon />
          <h5 className={cn(styles.cartTopTitle, "title-m")}>Корзина</h5>
        </div>
        <div className={styles.cartContent}>
          <div className={styles.cartMiddle}>
            <p className={styles.cartContentCount}>
              Товаров в корзине: <span>{totalCount}</span>
            </p>
            <div className={styles.cartItems}>
              {cartProducts.map((product) => (
                <CartProduct key={product.id} className={styles.cartItem} {...product} />
              ))}
            </div>
          </div>
          <div className={styles.cartBottom}>
            <div className={styles.cartPrice}>
              <p className={styles.cartPriceText}>Общая сумма заказа:</p>
              <p className={styles.cartPriceCount}>{totalPrice} ₽</p>
            </div>
            <div className={styles.cartBottomButtons}>
              <Button onClick={() => dispatch(clearProducts())} size="small" appearance="ghost">
                Очистить корзину
              </Button>
              {user ? (
                <Button className={styles.cartButton} onClick={() => setIsOpen(true)} size="small">
                  Продолжить
                </Button>
              ) : (
                <Button className={styles.cartButton} href="/signup" typeOf="link" size="small">
                  Продолжить
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <CartPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Cart;
