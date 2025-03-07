"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { useWindowSize } from "@/src/shared/hooks";
import { ProfileMenuItem } from "@/src/shared/types";
import { Icon, Popup } from "@/src/shared/ui";
import { UserNav } from "@/src/features/user/ui";
import { Search } from "@/src/features/products-actions/ui";

import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";

export const Header = ({ className, ...props }: HeaderProps) => {
  const { width } = useWindowSize();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = Boolean(width && width < 961);
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

  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile, pathname]);

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
            {!isMobile && <UserNav />}
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
          <UserNav />
          {renderMenuItems()}
        </Popup>
      )}
    </header>
  );
};
