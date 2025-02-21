"use client";

import cn from "classnames";
import { Fragment } from "react";
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from "@headlessui/react";

import { DropdownProps } from "./Dropdown.props";
import styles from "./Dropdown.module.scss";

export function Dropdown({
  children,
  panelClassName,
  buttonChildren,
  buttonClassName,
  overlay,
  className,
  float = true,
}: DropdownProps) {
  return (
    <Popover className={cn(styles.dropdown, className)}>
      <PopoverButton className={cn(styles.button, buttonClassName)}>
        {({ open }) => (
          <Fragment>
            {typeof buttonChildren === "function" ? buttonChildren(open) : buttonChildren}
          </Fragment>
        )}
      </PopoverButton>
      {overlay && <PopoverOverlay className={styles.overlay} />}
      <PopoverPanel className={cn(styles.panel, panelClassName, { [styles.float]: float })}>
        {children}
      </PopoverPanel>
    </Popover>
  );
}
