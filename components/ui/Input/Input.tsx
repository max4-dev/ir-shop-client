import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.scss";

const Input = ({ placeholder, className, ...props }: InputProps) => {
  return (
    <div className={cn(styles.inputBox, className)}>
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
      <input className={styles.input} placeholder={placeholder} {...props} />
    </div>
  );
}
 
export default Input;