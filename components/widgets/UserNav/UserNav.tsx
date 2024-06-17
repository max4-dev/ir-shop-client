"use client";

import cn from "classnames";
import Link from "next/link";
import { useMemo } from "react";

import { Icon, Dropdown, ProfileButton, ProfileMenu } from "@/components/shared/ui";
import { ProfileMenuItem } from "@/components/shared/ui/ProfileMenu/ProfileMenu.props";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { UserNavProps } from "./UserNav.props";
import styles from "./UserNav.module.scss";

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
