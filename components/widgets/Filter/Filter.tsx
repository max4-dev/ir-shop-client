"use client";

import cn from "classnames";
import ReactSlider from "react-slider";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";

import ArrowIcon from "@/public/images/icons/arrow.svg";
import { Checkbox, Button } from "@/components/shared/ui";
import { getCategories } from "@/components/entities/category/handler";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilter } from "@/redux/filter/slice";
import { defaultPrice, price } from "@/helpers/const/defaultPrice";
import { ICategory } from "@/components/entities/category/types";

import { FilterProps, IIsOpened, SliderStateWithValue } from "./Filter.props";
import styles from "./Filter.module.scss";

export const Filter = ({ setFilterOpen, className, ...props }: FilterProps) => {
  const dispatch = useAppDispatch();
  const [thumbValue, setThumbValue] = useState<number[]>(defaultPrice);
  const [isOpened, setOpened] = useState<IIsOpened>({ price: true });
  const [openedCategories, setOpenedCategories] = useState<Record<string, boolean>>({});
  const categories = useQuery({ queryKey: ["categories"], queryFn: getCategories.getAll });

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const { filter } = useAppSelector((state) => state.filter);
  const pathname = usePathname();
  const rangeSliderRef = useRef<SliderStateWithValue>(null);

  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      display: "block",
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
    hidden: {
      display: "block",
    },
  };

  const variantsChildren = {
    visible: {
      display: "block",
      opacity: 1,
    },
    hidden: {
      display: "none",
      opacity: shouldReduceMotion ? 1 : 0,
    },
  };

  useEffect(() => {
    setActiveCategories(filter.categories);
    if (rangeSliderRef.current) {
      rangeSliderRef.current.state.value = filter.price;
    }
    setThumbValue(filter.price);
  }, [filter.categories, filter.price, pathname]);

  const handleChangeOpen = (item: keyof IIsOpened) => {
    setOpened((prevState) => ({
      ...isOpened,
      [item]: !prevState[item],
    }));
  };

  const handleCategoryToggle = (categoryName: string) => {
    const index = activeCategories.indexOf(categoryName);
    if (index === -1) {
      setActiveCategories([...activeCategories, categoryName]);
    } else {
      setActiveCategories(activeCategories.filter((name) => name !== categoryName));
    }
  };

  const applyFilters = () => {
    dispatch(
      setFilter({
        categories: activeCategories,
        price: thumbValue,
      })
    );

    if (setFilterOpen) {
      setFilterOpen(false);
    }
  };

  const resetFilters = () => {
    if (rangeSliderRef.current) {
      rangeSliderRef.current.state.value = defaultPrice;
    }

    setActiveCategories([]);
    setThumbValue(defaultPrice);
    dispatch(
      setFilter({
        categories: [],
        price: defaultPrice,
      })
    );

    if (setFilterOpen) {
      setFilterOpen(false);
    }
  };

  const checkAllCategories = (categoryParent: string) => {
    const allCategoryNames: string[] = [];
    categories.data?.forEach((category) => {
      if (categoryParent === category.parent) {
        allCategoryNames.push(category.name);
      }
    });

    setActiveCategories((prevState) => [...prevState, ...allCategoryNames]);
  };

  const openSecondLevel = (categoryId: string) => {
    setOpenedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const buildSecondLevel = (category: ICategory) => {
    return (
      <li className={styles.selectItem} key={category.id}>
        <Checkbox
          checked={Boolean(
            activeCategories.find((activeCategory) => category.name === activeCategory)
          )}
          onChange={() => handleCategoryToggle(category.name)}
        >
          {category.name}
        </Checkbox>
      </li>
    );
  };

  const buildFirstLevel = () => {
    return (
      categories.data &&
      categories.data.map(
        (parentCategory: ICategory) =>
          !parentCategory.parent && (
            <motion.div
              className={styles.filterBlock}
              layout
              variants={variants}
              initial={openedCategories[parentCategory.name] ? "visible" : "hidden"}
              animate={openedCategories[parentCategory.name] ? "visible" : "hidden"}
              key={parentCategory.id}
            >
              <div
                className={styles.filterBlockTop}
                onClick={() => openSecondLevel(parentCategory.name)}
              >
                <h5 className={cn(styles.filterBlockTitle, "title-s")}>{parentCategory.name}</h5>
                <ArrowIcon
                  className={cn(styles.arrow, {
                    [styles.reverced]: parentCategory.isOpened,
                  })}
                />
              </div>
              <motion.div className={styles.filterBlockContent} variants={variantsChildren}>
                <button
                  onClick={() => checkAllCategories(parentCategory.slug)}
                  className={styles.selectButton}
                >
                  Выбрать все
                </button>
                <ul className={styles.select}>
                  {categories.data.map(
                    (category) =>
                      category.parent === parentCategory.slug && buildSecondLevel(category)
                  )}
                </ul>
              </motion.div>
            </motion.div>
          )
      )
    );
  };

  return (
    <aside className={cn(styles.filter, className)} {...props}>
      <h4 className={cn(styles.title, "title-m")}>Фильтры</h4>
      <div className={styles.filterBloks}>
        {buildFirstLevel()}
        <motion.div
          className={styles.filterBlock}
          variants={variants}
          initial={isOpened.price ? "visible" : "hidden"}
          animate={isOpened.price ? "visible" : "hidden"}
        >
          <div className={styles.filterBlockTop} onClick={() => handleChangeOpen("price")}>
            <h5 className={cn(styles.filterBlockTitle, "title-s")}>Цена</h5>
            <ArrowIcon className={cn(styles.arrow, { [styles.reverced]: isOpened.price })} />
          </div>
          <motion.div className={styles.filterBlockContent} variants={variantsChildren}>
            <div className={styles.filterBlockInputs}>
              <div className={styles.filterBlockInput}>{thumbValue[0]} ₽</div>
              <span className={styles.filterBlockLine}></span>
              <div className={styles.filterBlockInput}>{thumbValue[1]} ₽</div>
            </div>
            <ReactSlider
              className={styles.range}
              thumbClassName={styles.rangeThumb}
              trackClassName={styles.rangeTrack}
              defaultValue={defaultPrice}
              min={price.min}
              max={price.max}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => {
                return <div {...props} key={state.index}></div>;
              }}
              pearling
              minDistance={50}
              onChange={(value) => {
                setThumbValue(value);
              }}
              ref={rangeSliderRef}
            />
          </motion.div>
        </motion.div>
      </div>
      <div className={styles.filterButtons}>
        <Button onClick={applyFilters} className={styles.filterButton} size="fullWidth">
          Показать
        </Button>
        <Button
          onClick={resetFilters}
          className={styles.filterButton}
          appearance="ghost"
          size="fullWidth"
        >
          Сбросить
        </Button>
      </div>
    </aside>
  );
};
