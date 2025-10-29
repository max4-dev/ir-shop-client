import cn from "classnames";

import { Icon } from "../../assets";

import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";

export const Button = ({
  size = "medium",
  appearance = "primary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) => {
  const IconComponent = icon ? Icon[icon] : null;

  return (
    <button className={cn(styles.button, styles[size], styles[appearance], className)} {...props}>
      {children}
      {IconComponent && <IconComponent className={styles.icon} />}
    </button>
  );
};
