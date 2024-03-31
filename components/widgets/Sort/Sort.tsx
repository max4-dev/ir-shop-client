import cn from "classnames";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import ArrowIcon from '@/public/images/icons/arrow.svg';
import { SortEnum } from "@/redux/filter/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSort } from "@/redux/filter/slice";

import { SortProps } from "./Sort.props";
import styles from './Sort.module.scss';

const sortTypes = [
  { name: 'Рейтингу', type: SortEnum.Rating },
  { name: 'Цене', type: SortEnum.Price },
]

export const Sort = ({ className, ...props }: SortProps) => {
  const dispatch = useAppDispatch()
  const { sort } = useAppSelector(state => state.filter);

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <p className={styles.sortText}>Сортировка по:</p>
      <Menu as="div">
        {({ open }) => (
          <>
            <Menu.Button className={styles.sortMenu}>
              <span className={styles.sortButton}>
                {sort.name}
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
                  {sortTypes.map((sort) => (
                    <div className={styles.sortItem} key={sort.type} onClick={() => dispatch(setSort(sort))}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cn(styles.sortOption, {[styles.sortOptionActive]: active})}
                          >
                            {sort.name}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}