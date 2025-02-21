import cn from "classnames";

import { CheckboxProps } from "./Checkbox.props";
import styles from "./Checkbox.module.scss";

export const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  return (
    <label className={cn(styles.select, className)} tabIndex={0}>
      <input className={styles.selectInput} type="checkbox" {...props} />
      <span className={styles.selectCheckbox}></span>
      <p className={styles.selectText}>{children}</p>
    </label>
  );
}