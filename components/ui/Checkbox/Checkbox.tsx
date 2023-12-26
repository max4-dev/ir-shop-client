import { CheckboxProps } from "./Checkbox.props";
import cn from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ text, className, ...props }: CheckboxProps) => {
  return (
    <label className={cn(styles.select, className)} {...props}>
      <input className={styles.selectInput} type="checkbox" />
      <span className={styles.selectCheckbox}></span>
      <p className={styles.selectText}>{text}</p>
    </label>
  );
}
 
export default Checkbox;