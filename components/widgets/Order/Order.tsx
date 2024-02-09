"use client"

import cn from "classnames";

import { Button, Status } from "@/components/shared/ui";
import { OrderProduct } from "@/components/entities";

import { OrderProps } from "./Order.props";
import styles from './Order.module.scss';

export const Order = ({ className, ...props }: OrderProps) => {
  

  return (
    <div className={cn(styles.order, className)} {...props}>
      <h6 className={styles.orderName}>
        Заказ №645635346544
      </h6>
      <div className={styles.orderStatus}>
        <p className={styles.orderStatusTexxt}>
          Статус:
        </p>
        <Status />
      </div>
      <h5 className={cn(styles.orderTitle, "title-l")}>Товары</h5>
      <div className={styles.orderItems}>
        <OrderProduct className={styles.orderItem} price={35} productId={0} />
        <OrderProduct className={styles.orderItem} price={35} productId={1} />
        <OrderProduct className={styles.orderItem} price={35} productId={2} />
      </div>
      <div className={styles.orderButtons}>
        <Button size="small" appearance="ghost">Сообщить об ошибке</Button>
        <Button size="small" appearance="ghost">Отменить заказ</Button>
      </div>
    </div>
  );
}