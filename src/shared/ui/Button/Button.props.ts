import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { IconType } from "../../assets";

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
  > {
  size?: "small" | "medium" | "big" | "icon";
  appearance?: "primary" | "ghost" | "disabled";
  icon?: IconType;
}
