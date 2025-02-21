import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LoaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  loaderClassName?: string;
}
