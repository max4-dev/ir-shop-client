"use client";

import { useEffect } from "react";

import { Order } from "@/components/widgets";
import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/redux/store";
import { Loader, UserAside } from "@/components/shared/ui";

import styles from "./Orders.module.scss";

const Orders = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);

  const { user } = useAuth();
  const { profile, isLoading } = useAppSelector((state) => state.profile);

  const { getProfile } = useActions();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.id) {
        return;
      }

      getProfile();
    };

    fetchProfile();
  }, []);

  if (isLoading) {
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
                <div className={styles.ordersItem}>
                  <Order className={styles.order} />
                  <Order className={styles.order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
