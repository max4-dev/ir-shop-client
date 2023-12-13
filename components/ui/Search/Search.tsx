import { SearchProps } from "./Search.props";
import cn from "classnames";
import Image from "next/image";
import styles from './Search.module.scss';

const Search = ({ className, ...props }: SearchProps) => {
  return (
    <div className={cn(styles.search, className)} {...props}>
      <input className={styles.searchInput} type="text" placeholder="Я ищу..." />
      <button className={styles.searchButton}>
        <Image src="/images/icons/search.svg" alt="Поиск" width={18} height={18} />
      </button>
    </div>
  );
}
 
export default Search;