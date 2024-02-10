"use client";

import cn from "classnames";
import { Fragment } from "react";
import { Popover } from "@headlessui/react";

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
      <Popover.Button className={cn(styles.button, buttonClassName)}>
        {({ open }) => (
          <Fragment>
            {typeof buttonChildren === "function" ? buttonChildren(open) : buttonChildren}
          </Fragment>
        )}
      </Popover.Button>
      {overlay && <Popover.Overlay className={styles.overlay} />}
      <Popover.Panel className={cn(styles.panel, panelClassName, { [styles.float]: float })}>
        {children}
      </Popover.Panel>
    </Popover>
  );
}
