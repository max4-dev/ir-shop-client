"use client";

import cn from "classnames";
import { DialogTitle } from "@headlessui/react";

import { Popup } from "@/components/shared/ui";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { CartForm } from "../CartForm/CartForm";

import { CartPopupProps } from "./CartPopup.props";
import styles from "./CartPopup.module.scss";

export const CartPopup = ({ isOpen, setIsOpen, className, ...props }: CartPopupProps) => {
  const { totalCount, totalPrice } = useTypedSelector((state) => state.cart);

  return (
    <div className={cn(className)} {...props}>
      <Popup
        className={styles.popup}
        panelClassName={styles.popupPanel}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <DialogTitle className={cn(styles.popupTitle, "title-m")} as="h3">
          Итого
        </DialogTitle>
        <ul className={styles.popupList}>
          <li className={styles.popupItem}>
            <p className={styles.popupName}>
              Товары <span>({totalCount}):</span>
            </p>
            <p className="title-m">{totalPrice} ₽</p>
          </li>
        </ul>
        <div className={styles.popupContent}>
          <CartForm />
        </div>
      </Popup>
    </div>
  );
};
