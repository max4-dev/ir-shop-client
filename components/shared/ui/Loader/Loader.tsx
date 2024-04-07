"use client";

import styles from "./Loader.module.scss";
import { LoaderProps } from "./Loader.props";

export const Loader = ({ className, ...props }: LoaderProps) => {
  return (
    <div className={className}>
      <span className={styles.loader} {...props}></span>
    </div>
  );
}