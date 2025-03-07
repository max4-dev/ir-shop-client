"use client";

/* eslint-disable no-plusplus */

import cn from "classnames";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/src/shared/hooks";

import { setActivePage } from "../../model";

import { PaginationProps } from "./Pagination.props";
import styles from "./Pagination.module.scss";

export const Pagination = ({ pagesCount, currentPage, className, ...props }: PaginationProps) => {
  const [paginationList, setPaginationList] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const handleChangePage = (page: number) => {
    dispatch(setActivePage(page));
  };

  useEffect(() => {
    const generatePaginationList = () => {
      const newList = [];

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
      {paginationList.map((page, i) =>
        page !== -1 ? (
          <button
            onClick={() => handleChangePage(page)}
            className={cn(styles.paginationItem, styles.paginationItemLink, {
              [styles.paginationItemActive]: currentPage === page,
            })}
            key={i}
          >
            {page}
          </button>
        ) : (
          <span className={cn(styles.paginationItem, styles.paginationDots)} key={i}>
            ...
          </span>
        )
      )}
    </div>
  );
};
