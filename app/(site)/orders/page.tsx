"use client";

import cn from 'classnames';

import { Order } from '@/components/widgets';

import styles from './Orders.module.scss';

const Orders = () => {
  
  return ( 
    <div className={styles.orders}>
      <div className="container">
        <div className={styles.ordersInner}>
          <div className={styles.ordersAside}>
            <div className={styles.ordersAsideItem}>
              <h5 className={cn(styles.ordersAsideTitle, "title-l")}>
                Общая информация
              </h5>
              <p className={styles.ordersAsideText}>
                Пользователь №54353
              </p>
              <p className={styles.ordersAsideText}>
                example@gmail.com
              </p>
            </div>
            <div className={styles.ordersAsideItem}>
              <h5 className={cn(styles.ordersAsideTitle, "title-l")}>
                Статистика
              </h5>
              <div className={cn(styles.ordersAsideText, styles.ordersAsideStatistic)}>
                <p>Товаров куплено:</p>
                <p>10</p>
              </div>
              <div className={cn(styles.ordersAsideText, styles.ordersAsideStatistic)}>
                <p>Сейчас в доставке:</p>
                <p>4</p>
              </div>
            </div>
          </div>
          <div className={styles.ordersItems}>
            <div className={styles.ordersItem}>
              <Order className={styles.order} />
              <Order className={styles.order} />
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Orders;