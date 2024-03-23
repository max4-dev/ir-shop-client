"use client";

import cn from "classnames";
import Link from "next/link";

import { ProfileMenuProps } from "./ProfileMenu.props";
import styles from "./ProfileMenu.module.scss";

export function ProfileMenu({
  className,
  items,
  ...props
}: ProfileMenuProps) {
  return (
    <div className={cn(className, styles.menu)} {...props}>
      {items.map(menuItem => (
        menuItem.href ? 
        <Link className={styles.menuItem} href={menuItem.href} key={menuItem.title}>
          {menuItem.title}
        </Link> 
        : 
        <button className={styles.menuItem} key={menuItem.title} onClick={menuItem.onClick}>
          {menuItem.title}
        </button>
      ))}
    </div>
  );
}
