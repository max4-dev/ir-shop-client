import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import { IconType } from "../../assets";

export interface LinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  size?: "small" | "medium" | "big" | "icon";
  appearance?: "primary" | "ghost" | "disabled";
  icon?: IconType;
  href: string;
}
