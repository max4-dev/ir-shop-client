"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Search,
  Dropdown,
  ProfileButton,
  ProfileMenu,
  Popup,
  CityMenu,
  Icon,
  CitySearch,
} from "@/components/shared/ui";
import { ProfileMenuItem } from "@/components/shared/ui/ProfileMenu/ProfileMenu.props";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";

export const Header = ({ className, ...props }: HeaderProps) => {
  const { user } = useAuth();
  const { logout } = useActions();
  const { width } = useWindowSize();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = Boolean(width && width < 961);
  const { totalCount } = useTypedSelector((state) => state.cart);
  const { address } = useTypedSelector((state) => state.address);
  const pathname = usePathname();

  const menuItems = useMemo((): ProfileMenuItem[] => {
    return [
      {
        title: "Каталог",
        href: `/catalog`,
      },
      {
        title: "Оплата и доставка",
        href: `/pay`,
      },
      {
        title: "Контакты",
        href: "/contacts",
      },
    ];
  }, []);

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

  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [pathname]);

  const renderUserNav = () => {
    return (
      <div className={styles.userNav}>
        <div className={cn(styles.userNavLink, styles.profile)}>
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

  const renderMenuItems = () => {
    return (
      <ul className={styles.list}>
        {menuItems.map((menuItem) => (
          <li className={styles.listItem} key={menuItem.title}>
            {menuItem.href ? (
              <Link href={menuItem.href}>{menuItem.title}</Link>
            ) : (
              <button onClick={menuItem.onClick}>{menuItem.title}</button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.headerTop}>
        <div className="container">
          <div className={styles.headerTopInner}>
            <Dropdown
              panelClassName={styles.cityMenu}
              buttonChildren={
                <div className={styles.city}>
                  <Icon.LocationIcon />
                  <span>{address.value}</span>
                </div>
              }
            >
              <CityMenu customInput={CitySearch} />
            </Dropdown>
            <nav>{!isMobile && renderMenuItems()}</nav>
            <div className={styles.phone}>
              <Icon.PhoneIcon />
              <a href="tel:+79998549080">+7 (999) 854-90-80</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className="container">
          <div className={styles.headerBottomInner}>
            <Link href="/">
              <Image
                className={styles.logo}
                priority={true}
                src={`/images/logo${isMobile ? "-mobile" : ""}.svg`}
                width={181}
                height={48}
                alt="Логотип"
              />
            </Link>
            <Search className={styles.search} />
            {!isMobile && renderUserNav()}
            {isMobile && (
              <button
                className={styles.burger}
                onClick={() => setMenuOpen((prevState) => !prevState)}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <Popup isOpen={isMenuOpen} setIsOpen={setMenuOpen}>
          {renderUserNav()}
          {renderMenuItems()}
        </Popup>
      )}
    </header>
  );
};
