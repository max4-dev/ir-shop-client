import cn from "classnames";

import { BadgeProps } from "./Badge.props";
import styles from "./Badge.module.scss";

export const Badge = ({ className, children, appearance, ...props }: BadgeProps) => {
  return (
    <div className={cn(className, styles.badge, styles[appearance])} {...props}>
      {children}
    </div>
  );
};
