"use client";

import cn from "classnames";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

import { Button, Checkbox, Popup } from "@/components/shared/ui";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { CartPopupProps } from "./CartPopup.props";
import styles from "./CartPopup.module.scss";

export const CartPopup = ({ isOpen, setIsOpen, className, ...props }: CartPopupProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { totalCount, totalPrice } = useTypedSelector((state) => state.cart);

  return (
    <div className={cn(className)} {...props}>
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
        <Button className={styles.popupButton} size="fullWidth" disabled={!isChecked}>
          Оформить заказ
        </Button>
        <Checkbox
          className={styles.popupCheckbox}
          checked={isChecked}
          onChange={() => setIsChecked((prevState) => !prevState)}
        >
          Согласен с условиями Правил пользования торговой площадкой и правилами возврата
        </Checkbox>
      </Popup>
    </div>
  );
};
