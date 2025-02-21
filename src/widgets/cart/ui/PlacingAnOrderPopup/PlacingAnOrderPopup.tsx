import cn from "classnames";
import { DialogTitle } from "@headlessui/react";

import { useTypedSelector } from "@/src/shared/hooks";
import { Popup } from "@/src/shared/ui";
import { PlacingAnOrderForm } from "@/src/features/order/ui";

import { PlacingAnOrderPopupProps } from "./PlacingAnOrderPopup.props";
import styles from "./PlacingAnOrderPopup.module.scss";

export const PlacingAnOrderPopup = ({
  isOpen,
  setIsOpen,
  className,
  ...props
}: PlacingAnOrderPopupProps) => {
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
          <PlacingAnOrderForm />
        </div>
      </Popup>
    </div>
  );
};
