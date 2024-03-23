"use client";

import cn from "classnames";
import Link from "next/link";

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.scss";

export const Button = ({ size="medium", appearance="primary", icon="none", typeOf="button", href="", disabled=false, children, className, ...props }: ButtonProps) => {
  if (typeOf === "button") {
    return (<button className={cn(
        styles.button,
        styles.size,
        styles.appearance,
        {[styles.primary]:  appearance ==='primary'},
        {[styles.ghost]: appearance  ==='ghost'},
        {[styles.disabled]:  disabled},
        {[styles.medium]:  size ==='medium'},
        {[styles.big]: size  ==='big'},
        {[styles.fullWidth]:  size ==='fullWidth'},
        className
      )}
      disabled={disabled}
      {...props}
      >
      {children}
    </button>)
  }

  return (
    <Link className={cn(
        styles.button,
        styles.size,
        styles.appearance,
        {[styles.primary]:  appearance ==='primary'},
        {[styles.ghost]: appearance  ==='ghost'},
        {[styles.medium]:  size ==='medium'},
        {[styles.big]: size  ==='big'},
        {[styles.fullWidth]:  size ==='fullWidth'},
        className
      )}
      href={href}
      >
      {children}
    </Link>
  );
}