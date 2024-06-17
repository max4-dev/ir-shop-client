import cn from "classnames";
import { Fragment, memo } from "react";
import { Transition } from "@headlessui/react";

import { useAppDispatch } from "@/redux/store";
import { Dropdown, Icon } from "@/components/shared/ui";
import { SortEnum } from "@/redux/sort/types";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setSort } from "@/redux/sort/slice";

import { SortProps } from "./Sort.props";
import styles from "./Sort.module.scss";

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
