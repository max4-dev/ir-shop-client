import cn from "classnames";

import { CheckboxProps } from "./Checkbox.props";
import styles from "./Checkbox.module.scss";

export const Checkbox = ({ setChecked, children, className, ...props }: CheckboxProps) => {
  return (
    <label className={cn(styles.select, className)} tabIndex={0} {...props}>
      <input onClick={() => setChecked && setChecked((prevState) => !prevState)} className={styles.selectInput} type="checkbox" />
      <span className={styles.selectCheckbox}></span>
      <p className={styles.selectText}>{children}</p>
    </label>
  );
}