import cn from "classnames";
import React from "react";

import styles from "./Title.module.scss";
import { TitleProps } from "./Title.props";

export const Title = ({ className, size = "h2", variant = "default", ...props }: TitleProps) => {
  return React.createElement(size, {
    className: cn(className, styles.title, styles[size], styles[variant]),
    ...props,
  });
};
