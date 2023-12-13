import { HeaderProps } from "./Filter.props";
import cn from "classnames";
import styles from './Header.module.scss';
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/ui/Search/Search";
import Button from "@/components/ui/Button/Button";

const Filter = ({ className, ...props }: HeaderProps) => {
  return (
    <aside className={cn(styles.header, className)} {...props}>
      <h4 className={styles.title}>
        Фильтры
      </h4>
    </aside>
  );
}
 
export default Filter;