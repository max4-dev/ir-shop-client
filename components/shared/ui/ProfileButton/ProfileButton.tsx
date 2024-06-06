"use client";

import cn from "classnames";

import { Icon } from "../Icon/Icon";

import { ProfileButtonProps } from "./ProfileButton.props";
import styles from "./ProfileButton.module.scss";

export function ProfileButton({ className, ...props }: ProfileButtonProps) {
  return (
    <div className={cn(className, styles.profile)} {...props}>
      <Icon.UserIcon />
    </div>
  );
}
