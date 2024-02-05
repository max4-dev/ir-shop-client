"use client";

import cn from "classnames";
import Link from "next/link";

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.scss";

export const Button = ({ size="medium", appearance="primary", icon="none", typeOf="button", href="", children, className, ...props }: ButtonProps) => {
  if (typeOf === "button") {
    return (<button className={cn(
        styles.button,
        styles.size,
        styles.appearance,
        {[styles.primary]:  appearance ==='primary'},
        {[styles.ghost]: appearance  ==='ghost'},
        {[styles.disabled]:  appearance ==='disabled'},
        {[styles.medium]:  size ==='medium'},
        {[styles.big]: size  ==='big'},
        {[styles.fullWidth]:  size ==='fullWidth'},
        className
      )}
      disabled={appearance ==='disabled'}
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