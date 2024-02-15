"use client";

import cn from "classnames";
import Image from "next/image";

import { ProfileButtonProps } from "./ProfileButton.props";
import styles from "./ProfileButton.module.scss";

export function ProfileButton({
  className,
  ...props
}: ProfileButtonProps) {
  return (
    <div className={cn(className, styles.profile)} {...props}>
      <Image src="/images/icons/user.svg" width={23} height={29} alt="Изображение пользователя" />
    </div>
  );
}
