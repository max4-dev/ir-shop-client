import cn from "classnames";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import ArrowIcon from '@/public/images/icons/arrow.svg';

import { SortProps } from "./Sort.props";
import styles from './Sort.module.scss';

export const Sort = ({ className, ...props }: SortProps) => {

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <p className={styles.sortText}>Сортировка по:</p>
      <Menu as="div">
        {({ open }) => (
          <>
            <Menu.Button className={styles.sortMenu}>
              <span className={styles.sortButton}>
                Options
              </span>
              <div className={styles.sortArrow}>
                <ArrowIcon className={cn(styles.sortArrowIcon, {[styles.sortArrowIconActive]: open})} />
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter={styles.enter}
              enterFrom={styles.enterFrom}
              enterTo={styles.enterTo}
              leave={styles.leave}
              leaveFrom={styles.leaveFrom}
              leaveTo={styles.leaveTo}
            >
              <Menu.Items className={styles.sortItems}>
                <div className={styles.sortItem}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cn(styles.sortOption, {[styles.sortOptionActive]: active})}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className={styles.sortItem}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cn(styles.sortOption, {[styles.sortOptionActive]: active})}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className={styles.sortItem}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cn(styles.sortOption, {[styles.sortOptionActive]: active})}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}