"use client";

import { useEffect } from "react";

import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/redux/store";
import { Loader, UserAside } from "@/components/shared/ui";
import { Order } from "@/components/entities/order/ui";
import { useOrders } from "@/hooks/useOrders";

import styles from "./Orders.module.scss";

const Orders = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);

  const { user } = useAuth();
  const { profile, isLoading: profileIsLoading } = useAppSelector((state) => state.profile);

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
