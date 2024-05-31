"use client";

import cn from "classnames";

import { LoaderProps } from "./Loader.props";
import styles from "./Loader.module.scss";

export const Loader = ({ loaderClassName, className, ...props }: LoaderProps) => {
  return (
    <div className={className}>
      <span className={cn(loaderClassName, styles.loader)} {...props}></span>
    </div>
  );
};
