import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

import { IconType } from "../Icon/Icon";

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onAnimationStart" | "onDraagStart" | "onDragEnd" | "onDrag" | "ref"
  > {
  children: ReactNode;
  size?: "fullWidth" | "small" | "medium" | "big";
  appearance?: "primary" | "ghost" | "disabled";
  icon?: IconType;
  typeOf?: "link" | "button";
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
