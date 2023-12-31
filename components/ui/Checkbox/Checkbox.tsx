import { CheckboxProps } from "./Checkbox.props";
import cn from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  return (
    <label className={cn(styles.select, className)} tabIndex={0} {...props}>
      <input className={styles.selectInput} type="checkbox" />
      <span className={styles.selectCheckbox}></span>
      <p className={styles.selectText}>{children}</p>
    </label>
  );
}
 
export default Checkbox;