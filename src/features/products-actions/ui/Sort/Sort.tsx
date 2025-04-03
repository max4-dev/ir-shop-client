import { Transition } from "@headlessui/react";
import cn from "classnames";
import { Fragment, memo } from "react";

import { useAppDispatch, useTypedSelector } from "@/src/shared/hooks";
import { Dropdown, Icon } from "@/src/shared/ui";

import { setSort } from "../../model";
import { SortEnum } from "../../model/sort/types";

import styles from "./Sort.module.scss";
import { SortProps } from "./Sort.props";

const sortTypes = [
  { name: "Новизне", type: SortEnum.New },
  { name: "Большей цене", type: SortEnum.MaxPrice },
  { name: "Меньшей цене", type: SortEnum.MinPrice },
];

export const Sort = memo(({ className, ...props }: SortProps) => {
  const dispatch = useAppDispatch();
  const { sort } = useTypedSelector((state) => state.sort);

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <p className={styles.sortText}>Сортировка по:</p>
      <Dropdown
        buttonChildren={(open) => (
          <div className={styles.sortMenu}>
            <span className={styles.sortButton}>{sort.name}</span>
            <div className={styles.sortArrow}>
              <Icon.ArrowIcon
                className={cn(styles.sortArrowIcon, { [styles.sortArrowIconActive]: open })}
              />
            </div>
          </div>
        )}
        panelClassName={styles.panel}
      >
        <Transition
          show={true}
          as={Fragment}
          enter={styles.enter}
          enterFrom={styles.enterFrom}
          enterTo={styles.enterTo}
          leave={styles.leave}
          leaveFrom={styles.leaveFrom}
          leaveTo={styles.leaveTo}
        >
          <div className={styles.sortItems}>
            {sortTypes.map((sort) => (
              <div className={styles.sortItem} key={sort.type}>
                <button onClick={() => dispatch(setSort(sort))} className={cn(styles.sortOption)}>
                  {sort.name}
                </button>
              </div>
            ))}
          </div>
        </Transition>
      </Dropdown>
    </div>
  );
});

Sort.displayName = "Sort";
