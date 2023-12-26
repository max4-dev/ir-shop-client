import { StyledLinkProps } from "./StyledLink.props";
import cn from "classnames";
import Image from "next/image";
import styles from "@/scss/Button/Button.module.scss";
import Link from "next/link";

const StyledLink = ({ size="medium", appearance="primary", icon="none", children, className, ...props }: StyledLinkProps) => {
  return (
    <Link className={cn(
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
    </Link>
  );
}
 
export default StyledLink;