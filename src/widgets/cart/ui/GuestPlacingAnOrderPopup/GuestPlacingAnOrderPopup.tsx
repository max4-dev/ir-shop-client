import cn from "classnames";
import { DialogTitle } from "@headlessui/react";

import { useTypedSelector } from "@/src/shared/hooks";
import { Popup } from "@/src/shared/ui";
import { GuestPlacingAnOrderForm } from "@/src/features/order/ui";

import { GuestPlacingAnOrderPopupProps } from "./GuestPlacingAnOrderPopup.props";
import styles from "./GuestPlacingAnOrderPopup.module.scss";

export const GuestPlacingAnOrderPopup = ({
  isOpen,
  setIsOpen,
  className,
  ...props
}: GuestPlacingAnOrderPopupProps) => {
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
        <div className={styles.popupContent}>
          <GuestPlacingAnOrderForm />
        </div>
        <ul className={styles.popupList}>
          <li className={styles.popupItem}>
            <p className={styles.popupName}>
              Товары <span>({totalCount}):</span>
            </p>
            <p className="title-m">{totalPrice} ₽</p>
          </li>
        </ul>
      </Popup>
    </div>
  );
};
