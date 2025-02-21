"use client";

import { useEffect } from "react";
import cn from "classnames";

import { useAuth, useAuthRedirect, UserTypes } from "@/src/features/auth/hooks";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { useOrders } from "@/src/entities/order/hooks";
import { Loader, UserAside } from "@/src/shared/ui";
import { Order } from "@/src/entities/order/ui";

import styles from "./Orders.module.scss";

const Orders = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);

  const { user } = useAuth();
  const { profile, isLoading: profileIsLoading } = useTypedSelector((state) => state.profile);

  const { getProfile } = useActions();
  const { data, isLoading } = useOrders();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.id) {
        return;
      }

      getProfile();
    };

    fetchProfile();
  }, []);

  if (isLoading || profileIsLoading) {
    return <Loader className={styles.loader} />;
  }

  if (data?.length === 0) {
    return (
      <div className="container">
        <h3 className={cn("title-b", styles.ordersNotFoundTitle)}>Пока нет заказов</h3>
      </div>
    );
  }

  return (
    <>
      {profile && (
        <div className={styles.orders}>
          <div className="container">
            <div className={styles.ordersInner}>
              <UserAside profile={profile} />
              <div className={styles.ordersItems}>
                {data && (
                  <div className={styles.ordersItem}>
                    {data.map((order) => (
                      <Order className={styles.order} key={order.id} {...order} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
