"use client";

import cn from "classnames";
import { useState } from "react";

import { useAppDispatch, useTypedSelector } from "@/src/shared/hooks";
import { useAuth } from "@/src/features/auth/hooks";
import { Button, Icon, Loader } from "@/src/shared/ui";
import { CartProduct } from "@/src/entities/product/ui";
import { clearProducts } from "@/src/entities/cart/model";
import { GuestPlacingAnOrderPopup, PlacingAnOrderPopup } from "@/src/widgets/cart/ui";

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
              <Button className={styles.cartButton} onClick={() => setIsOpen(true)} size="small">
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <PlacingAnOrderPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <GuestPlacingAnOrderPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Cart;
