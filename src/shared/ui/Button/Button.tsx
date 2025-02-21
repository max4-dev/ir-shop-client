"use client";

import cn from "classnames";
import Link from "next/link";

import { Loader } from "../Loader/Loader";
import { Icon } from "../Icon/Icon";

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.scss";

export const Button = ({
  size = "medium",
  appearance = "primary",
  icon,
  typeOf = "button",
  href = "",
  disabled = false,
  isLoading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const IconComponent = icon ? Icon[icon] : null;

  if (typeOf === "button") {
    return (
      <button
        className={cn(
          styles.button,
          styles.size,
          styles.appearance,
          { [styles.primary]: appearance === "primary" },
          { [styles.ghost]: appearance === "ghost" },
          { [styles.disabled]: disabled },
          { [styles.medium]: size === "medium" },
          { [styles.big]: size === "big" },
          { [styles.fullWidth]: size === "fullWidth" },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader loaderClassName={styles.loader} />
        ) : (
          <>
            {children}
            {IconComponent && <IconComponent className={styles.icon} />}
          </>
        )}
      </button>
    );
  }

  return (
    <Link
      className={cn(
        styles.button,
        styles.size,
        styles.appearance,
        { [styles.primary]: appearance === "primary" },
        { [styles.ghost]: appearance === "ghost" },
        { [styles.medium]: size === "medium" },
        { [styles.big]: size === "big" },
        { [styles.fullWidth]: size === "fullWidth" },
        className
      )}
      href={href}
    >
      {isLoading ? (
        <Loader loaderClassName={styles.loader} />
      ) : (
        <>
          {children}
          {IconComponent && <IconComponent className={styles.icon} />}
        </>
      )}
    </Link>
  );
};
