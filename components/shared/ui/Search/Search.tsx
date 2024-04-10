import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSearch } from "@/redux/filter/slice";

import { SearchProps } from "./Search.props";
import styles from './Search.module.scss';

export const Search = ({ className, ...props }: SearchProps) => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.filter);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn(styles.search, className)} {...props}>
      <input
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        onKeyDown={(e) => {
            if (pathname !== '/' && e.code === 'Enter') {
              router.push('/');
            }
          }
        }
        className={styles.searchInput}
        type="text"
        placeholder="Я ищу..."
      />
      <Link href="/" className={styles.searchButton}>
        <Image src="/images/icons/search.svg" alt="Поиск" width={18} height={18} />
      </Link>
    </div>
  );
}