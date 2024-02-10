"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button, Search, Dropdown, ProfileButton, ProfileMenu } from "@/components/shared/ui";
import { ProfileMenuItem } from "@/components/shared/ui/ProfileMenu/ProfileMenu.props";

import { HeaderProps } from "./Header.props";
import styles from './Header.module.scss';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isAuth, setIsAuth] = useState(true);

  const menuItems = useMemo((): ProfileMenuItem[] => {
    return [
      {
        title: "Профиль",
        href: `profile`,
      },
      {
        title: "Мои заказы",
        href: `orders`,
      },
      {
        title: "Выйти",
        href: "/",
        // onClick: clearTokens,
      },
    ]
  }, []);

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.headerTop}>
        <div className="container">
          <div className={styles.headerTopInner}>
            <div className={styles.city}>
              <Image src="/images/icons/location.svg" alt="" width={12} height={12} />
              <button>Москва</button>
            </div>
            <nav>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <Link href={'/catalog'}>Каталог</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href={'/pay'}>Оплата и доставка</Link>
                </li>
                <li className={styles.listItem}>
                  <Link href={'/contacts'}>Контакты</Link>
                </li>
              </ul>
            </nav>
            <div className={styles.phone}>
              <Image src="/images/icons/phone.svg" alt="" width={16} height={16} />
              <a href="tel:+79998549080">+7 (999) 854-90-80</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className="container">
          <div className={styles.headerBottomInner}>
            <Link href="/">
              <Image src="/images/logo.svg" alt="Логотип" width={181} height={48} />
            </Link>
            <Search />
            <div className={styles.userNav}>
              {isAuth &&
                <div className={cn(styles.userNavLink, styles.profile)}>
                  <Dropdown buttonChildren={(open) => <ProfileButton />} panelClassName={styles.panel}>
                    <ProfileMenu items={menuItems} />
                  </Dropdown>
                </div>
              }
              <Link className={cn(styles.userNavLink, styles.userNavFavorite)} href={'/favorites'}>
                <Image src={'/images/icons/favorite.svg'} alt="Избранное" width={26} height={23} />
              </Link>
              <Link className={cn(styles.userNavLink, styles.userNavCart)} href={'/cart'}>
                <Image src={'/images/icons/cart.svg'} alt="Корзина" width={28} height={28} />
              </Link>
            </div>
            {!isAuth && 
              <div className={styles.sign}>
                <Button className={styles.signButton} typeOf="link" size="small" appearance="ghost" href="/login">
                  Войти
                </Button>
                <Button className={styles.signButton} typeOf="link" size="small" href="/signup">
                  Регистрация
                </Button>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
}