import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "decorated";
}
