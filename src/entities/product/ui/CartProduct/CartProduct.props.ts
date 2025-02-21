import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "../../types";

export type CartProductProps = IProduct &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    count: number;
  };
