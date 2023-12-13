import { ButtonProps } from "./Button.props";
import cn from "classnames";
import Image from "next/image";
import styles from "./Button.module.scss";

const Button = ({ size="medium", appearance="primary", icon="none", children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(
        styles.button,
        styles.size,
        styles.appearance,
        {[styles.primary]:  appearance ==='primary'},
        {[styles.ghost]: appearance  ==='ghost'},
        {[styles.medium]:  size ==='medium'},
        {[styles.big]: size  ==='big'},
        {[styles.fullWidth]:  size ==='fullWidth'},
        className
      )}
      {...props}
      >
      {children}
    </button>
  );
}
 
export default Button;