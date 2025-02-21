import cn from "classnames";

import styles from "./UserAside.module.scss";
import { UserAsideProps } from "./UserAside.props";

export const UserAside = ({ profile, className, ...props }: UserAsideProps) => {
  return (
    <>
      {profile && (
        <aside className={cn(className, styles.ordersAside)} {...props}>
          <div className={styles.ordersAsideItem}>
            <h5 className={cn(styles.ordersAsideTitle, "title-l")}>Общая информация</h5>
            <p className={styles.ordersAsideText}>{profile.name}</p>
            <p className={styles.ordersAsideText}>{profile.phone}</p>
          </div>
          {/* <div className={styles.ordersAsideItem}>
            <h5 className={cn(styles.ordersAsideTitle, "title-l")}>Статистика</h5>
            <div className={cn(styles.ordersAsideText, styles.ordersAsideStatistic)}>
              <p>Товаров куплено:</p>
              <p>10</p>
            </div>
            <div className={cn(styles.ordersAsideText, styles.ordersAsideStatistic)}>
              <p>Сейчас в доставке:</p>
              <p>4</p>
            </div>
          </div> */}
        </aside>
      )}
    </>
  );
};
