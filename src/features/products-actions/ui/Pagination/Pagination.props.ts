import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pagesCount: number;
  currentPage: number;
}