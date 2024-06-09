"use client";

import cn from "classnames";

import { Button, Status } from "@/components/shared/ui";
import { OrderProduct } from "@/components/entities/product/ui";
import { useProducts } from "@/hooks/useProducts";
import { notify } from "@/helpers/toastMessage";

import { OrderProps } from "./Order.props";
import styles from "./Order.module.scss";

export const Order = ({ className, id, price, count, products, status, ...props }: OrderProps) => {
  const { data } = useProducts();

  return (
    <div className={cn(styles.order, className)} {...props}>
      <h6 className={styles.orderName}>Заказ: {id}</h6>
      <div className={styles.orderStatus}>
        <p className={styles.orderStatusTexxt}>Статус:</p>
        <Status status={status} />
      </div>
      {data && products && (
        <>
          <h5 className={cn(styles.orderTitle, "title-l")}>Товары</h5>
          <div className={styles.orderItems}>
            {products.map((orderProduct) => {
              const product = data && data.find((product) => product.id === orderProduct.id);

              if (!product) {
                notify({
                  message: `Товар ${orderProduct.id} не найден. Обратитесь в поддержку`,
                  type: "error",
                });
                return null;
              }

              return (
                <OrderProduct
                  className={styles.orderItem}
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.priceWithSale}
                  count={orderProduct.count}
                  imageUrl={product.images[0]}
                />
              );
            })}
          </div>
        </>
      )}
      <div className={styles.orderStatisticBox}>
        <div className={styles.orderStatistic}>
          <p className={styles.orderStatisticText}>Общее количество товаров заказа:</p>
          <p className={styles.orderStatisticCount}>{count} шт.</p>
        </div>
        <div className={styles.orderStatistic}>
          <p className={styles.orderStatisticText}>Общая сумма заказа:</p>
          <p className={styles.orderStatisticCount}>{price} ₽</p>
        </div>
      </div>
      <div className={styles.orderButtons}>
        <Button size="small" appearance="ghost">
          Сообщить об ошибке
        </Button>
      </div>
    </div>
  );
};
