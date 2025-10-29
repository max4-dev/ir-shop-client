import cn from "classnames";
import NextLink from "next/link";

import { Icon } from "@src/shared/assets";

import styles from "./Link.module.scss";
import { LinkProps } from "./Link.props";

export const Link = ({
  size = "medium",
  appearance = "primary",
  icon,
  children,
  className,
  ...props
}: LinkProps) => {
  const IconComponent = icon ? Icon[icon] : null;

  return (
    <NextLink className={cn(styles.link, styles[size], styles[appearance], className)} {...props}>
      {children}
      {IconComponent && <IconComponent className={styles.icon} />}
    </NextLink>
  );
};
