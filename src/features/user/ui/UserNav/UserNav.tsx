"use client";

import cn from "classnames";
import Link from "next/link";
import { useMemo } from "react";

import { useAuth } from "@/src/features/auth/hooks";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { ProfileMenuItem } from "@/src/shared/types";
import { Dropdown, Icon, ProfileButton, ProfileMenu } from "@/src/shared/ui";

import styles from "./UserNav.module.scss";
import { UserNavProps } from "./UserNav.props";

export const UserNav = ({ className, ...props }: UserNavProps) => {
  const { user } = useAuth();
  const { logout } = useActions();
  const { totalCount } = useTypedSelector((state) => state.cart);

  const profileItems = useMemo((): ProfileMenuItem[] => {
    return user
      ? [
          {
            title: "Профиль",
            href: `/profile`,
          },
          {
            title: "Мои заказы",
            href: `/orders`,
          },
          {
            title: "Выйти",
            onClick: logout,
          },
        ]
      : [
          {
            title: "Войти",
            href: `/login`,
          },
          {
            title: "Регистрация",
            href: `/signup`,
          },
        ];
  }, [user]);

  return (
    <div className={cn(className, styles.userNav)}>
      <div className={cn(styles.userNavLink, styles.profile)} {...props}>
        <Dropdown buttonChildren={() => <ProfileButton />} panelClassName={styles.panel}>
          <ProfileMenu items={profileItems} />
        </Dropdown>
      </div>
      <Link className={cn(styles.userNavLink, styles.userNavFavorite)} href={"/favorites"}>
        <Icon.FavoriteIcon className={styles.favoriteIcon} />
      </Link>
      <Link className={cn(styles.userNavLink, styles.userNavCart)} href={"/cart"}>
        {totalCount > 0 && <span className={styles.userNavCartCount}>{totalCount}</span>}
        <Icon.CartIcon />
      </Link>
    </div>
  );
};
