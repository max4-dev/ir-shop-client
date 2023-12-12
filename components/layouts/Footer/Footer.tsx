import { FooterProps } from "./Footer.props";
import cn from "classnames";
import styles from './Footer.module.scss';

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      
    </footer>
  );
}
 
export default Footer;