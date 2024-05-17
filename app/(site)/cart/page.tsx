"use client";

import Image from "next/image";
import cn from "classnames";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import { CartProduct } from "@/components/entities/product/ui";
import { Button, Checkbox, Popup } from "@/components/shared/ui";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearProducts } from "@/redux/cart/slice";

import styles from "./Cart.module.scss";

const Cart = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { products, totalCount, totalPrice } = useAppSelector((state) => state.cart);

  if (products.length === 0) {
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
          <Image src="/images/icons/cart-white.svg" width={48} height={48} alt="Корзина" />
          <h5 className={cn(styles.cartTopTitle, "title-m")}>Корзина</h5>
        </div>
        <div className={styles.cartContent}>
          <div className={styles.cartMiddle}>
            <p className={styles.cartContentCount}>
              Товаров в корзине: <span>{totalCount}</span>
            </p>
            <div className={styles.cartItems}>
              {products.map((product) => (
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
      <Popup className={styles.popup} isOpen={isOpen} setIsOpen={setIsOpen}>
        <Dialog.Title className={cn(styles.popupTitle, "title-m")} as="h3">
          Итого
        </Dialog.Title>
        <ul className={styles.popupList}>
          <li className={styles.popupItem}>
            <p className={styles.popupName}>
              Товары <span>({totalCount})</span>
            </p>
            <p className={styles.popupValue}>{totalPrice} ₽</p>
          </li>
          <li className={styles.popupItem}>
            <p className={styles.popupName}>Итого</p>
            <p className="title-m">{totalPrice} ₽</p>
          </li>
        </ul>
        <Button className={styles.popupButton} size="fullWidth" appearance="disabled">
          Оформить заказ
        </Button>
        <Checkbox className={styles.popupCheckbox}>
          Согласен с условиями Правил пользования торговой площадкой и правилами возврата
        </Checkbox>
      </Popup>
    </div>
  );
};

export default Cart;
