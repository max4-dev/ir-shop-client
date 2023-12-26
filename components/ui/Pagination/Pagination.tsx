"use client"

import { PaginationProps } from "./Pagination.props";
import cn from "classnames";
import Image from "next/image";
import styles from "./Pagination.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

const Pagination = ({ pagesCount, currentPage, className, ...props }: PaginationProps) => {
  const [paginationList, setPaginationList] = useState<number[]>([]);

  useEffect(() => {
    const generatePaginationList = () => {
      let newList = [];

      const maxPagesToShow = 3;

      if (pagesCount > maxPagesToShow) {
        const firstPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const lastPage = Math.min(pagesCount, firstPage + maxPagesToShow - 1);

        if (firstPage > 1) {
          newList.push(1);
          if (firstPage > 2) {
            newList.push(-1);
          }
        }

        for (let i = firstPage; i <= lastPage; i++) {
          newList.push(i);
        }

        if (lastPage < pagesCount) {
          if (lastPage < pagesCount - 1) {
            newList.push(-1);
          }
          newList.push(pagesCount);
        }
      } else {
        for (let i = 1; i <= pagesCount; i++) {
          newList.push(i);
        }
      }

      setPaginationList(newList);
    };

    generatePaginationList();
  }, [currentPage, pagesCount]);
  
  return (
    <div className={cn(styles.pagination, className)} {...props}>
      {paginationList.map((page, i) => (
        page !== -1 ? <Link className={cn(styles.paginationItem, styles.paginationItemLink, {[styles.paginationItemActive]: currentPage === page})} href={`/catalog/${page}`} key={i}>{page}</Link>
        : <span className={cn(styles.paginationItem, styles.paginationDots)} key={i}>...</span>
      ))}
    </div>
  );
}
 
export default Pagination;