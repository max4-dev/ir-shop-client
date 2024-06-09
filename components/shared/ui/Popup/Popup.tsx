"use client";

import cn from "classnames";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment } from "react";

import { Icon } from "../Icon/Icon";

import { PopupProps } from "./Popup.props";
import styles from "./Popup.module.scss";

export const Popup = ({
  isOpen,
  setIsOpen,
  children,
  panelClassName,
  className,
  ...props
}: PopupProps) => {
  return (
    <div className={cn(styles.popup, className)} {...props}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.popupDialog} onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <div className={styles.popupBackground} />
          </TransitionChild>

          <div className={styles.popupBox}>
            <TransitionChild
              as={Fragment}
              enter={styles.enter}
              enterFrom={styles.enterFrom}
              enterTo={styles.enterTo}
              leave={styles.leave}
              leaveFrom={styles.leaveFrom}
              leaveTo={styles.leaveTo}
            >
              <DialogPanel className={cn(panelClassName, styles.popupPanel)}>
                <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                  <Icon.CloseIcon />
                </button>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
