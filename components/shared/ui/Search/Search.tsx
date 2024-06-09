"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSearch } from "@/redux/filter/slice";

import { Icon } from "../Icon/Icon";

import { SearchProps } from "./Search.props";
import styles from "./Search.module.scss";

export const Search = ({ className, ...props }: SearchProps) => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.filter);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <input
        value={search}
        ref={inputRef}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        onKeyDown={(e) => {
          if (pathname !== "/" && e.code === "Enter") {
            router.push("/");
          }
        }}
        className={styles.searchInput}
        type="text"
        placeholder="Я ищу..."
      />
      {search && (
        <button onClick={handleClear} className={styles.searchClear}>
          <Icon.CloseIcon />
        </button>
      )}
      <Link href="/" className={styles.searchButton}>
        <Icon.SearchIcon />
      </Link>
    </div>
  );
};
