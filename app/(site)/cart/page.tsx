"use client";

import Image from "next/image";
import cn from "classnames";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import { CartProduct } from "@/components/widgets";
import { Button, Checkbox, Popup } from "@/components/shared/ui";

import styles from "./Cart.module.scss";

const Cart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return ( 
    <div className="container">
      <h2 className={cn(styles.cartTitle, "title-b")}>
        Оформление заказа
      </h2>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <Image src="/images/icons/cart-white.svg" width={48} height={48} alt="Корзина" />
          <h5 className={cn(styles.cartTopTitle, "title-m")}>Корзина</h5>
        </div>
        <div className={styles.cartContent}>
          <div className={styles.cartMiddle}>
            <p className={styles.cartContentCount}>
              Товаров в корзине: <span>4</span>
            </p>
            <div className={styles.cartItems}>
              <CartProduct className={styles.cartItem} salePercent={10} price={35} productId={0} />
              <CartProduct className={styles.cartItem} price={35} productId={1} />
              <CartProduct className={styles.cartItem} price={35} productId={2} />
              <CartProduct className={styles.cartItem} price={35} productId={3} />
            </div>
          </div>
          <div className={styles.cartBottom}>
            <div className={styles.cartPrice}>
              <p className={styles.cartPriceText}>
                Общая сумма заказа:
              </p>
              <p className={styles.cartPriceCount}>
                23 508 ₽
              </p>
            </div>
            <Button className={styles.cartButton} onClick={() => setIsOpen(true)} size="small">
              Продолжить
            </Button>
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
              Товары <span>(2)</span>
            </p>
            <p className={styles.popupValue}>23 508 ₽</p>
          </li>
          <li className={styles.popupItem}>
            <p className={styles.popupName}>
              Итого
            </p>
            <p className="title-m">23 508 ₽</p>
          </li>
        </ul>
        <Button className={styles.popupButton} size="fullWidth" appearance="disabled">Оформить заказ</Button>
        <Checkbox className={styles.popupCheckbox}>
          Согласен с условиями Правил пользования торговой площадкой и правилами возврата
        </Checkbox>
      </Popup>
    </div>
   );
}
 
export default Cart;