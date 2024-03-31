"use client"

import cn from "classnames";
import ReactSlider from "react-slider";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";

import ArrowIcon from '@/public/images/icons/arrow.svg'
import { Checkbox, Button } from "@/components/shared/ui";
import { getCategories } from "@/components/entities/Category/handler";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilter } from "@/redux/filter/slice";
import { defaultPrice, price } from "@/helpers/const/defaultPrice";

import { FilterProps, IIsOpened, SliderStateWithValue } from "./Filter.props";
import styles from './Filter.module.scss';

export const Filter = ({ setFilterOpen, className, ...props }: FilterProps) => {
  const dispatch = useAppDispatch();
  const [thumbValue, setThumbValue] = useState<number[]>(defaultPrice);
  const [isOpened, setOpened] =  useState<IIsOpened>({ type: true, price: true })
  const categories = useQuery({queryKey: ['categories'], queryFn: getCategories.getAll});
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const { filter } = useAppSelector(state => state.filter)
  const pathname = usePathname();
  const rangeSliderRef = useRef<SliderStateWithValue>(null);

  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {}
  }

  const variantsChildren = {
    visible: {
      display: 'block',
      opacity: 1,
    },
    hidden: {
      display: 'none',
      opacity: shouldReduceMotion ? 1 : 0,
    }
  }

  const handleChangeOpen = (item: keyof IIsOpened) => {
    setOpened((prevState) => ({
      ...isOpened,
      [item]: !prevState[item]
    }))
  }

  const handleCategoryToggle = (categoryName: string) => {
    const index = activeCategories.indexOf(categoryName);
    if (index === -1) {
      setActiveCategories([...activeCategories, categoryName]);
    } else {
      setActiveCategories(activeCategories.filter(name => name !== categoryName));
    }
  }

  const applyFilters = () => {
    if (setFilterOpen) {
      setFilterOpen(false);
    }

    dispatch(setFilter({
      categories: activeCategories,
      price: thumbValue,
    }));
  }

  const resetFilters = () => {
    if (rangeSliderRef.current) {
      rangeSliderRef.current.state.value = defaultPrice;
    }
    
    setActiveCategories([]);
    setThumbValue(defaultPrice);
    dispatch(setFilter({
      categories: [],
      price: defaultPrice,
    }));
  }

  const checkAllCategories = () => {
    const allCategoryNames: string[] = [];
    categories.data?.map((category) => (
      allCategoryNames.push(category.name)
    ));

    setActiveCategories(allCategoryNames);
  }

  useEffect(() => {
    setActiveCategories(filter.categories)
    if (rangeSliderRef.current) {
      rangeSliderRef.current.state.value = filter.price;
    }
    setThumbValue(filter.price)
  }, [pathname]);
  

  return (
    <aside className={cn(styles.filter, className)} {...props}>
      <h4 className={cn(styles.title, "title-m")}>
        Фильтры
      </h4>
      <div className={styles.filterBloks}>
        <motion.div
          className={styles.filterBlock}
          layout
          variants={variants}
          initial={isOpened.type ? 'visible' : 'hidden'}
          animate={isOpened.type ? 'visible' : 'hidden'}
        >
          <div className={styles.filterBlockTop} onClick={() => handleChangeOpen('type')}>
            <h5 className={cn(styles.filterBlockTitle, "title-s")}>
              Тип
            </h5>
            <ArrowIcon className={cn(styles.arrow, {[styles.reverced]: isOpened.type})} />
          </div>
          {categories.data && <motion.div className={styles.filterBlockContent} variants={variantsChildren}>
            <button onClick={checkAllCategories} className={styles.selectButton}>
              Выбрать все
            </button>
            <ul className={styles.select}>
              {categories.data.map((category) => (
                <Checkbox 
                  key={category.id}
                  className={styles.selectItem}
                  checked={Boolean(activeCategories.find(activeCategory => category.name === activeCategory))}
                  onChange={() => handleCategoryToggle(category.name)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </ul>
          </motion.div>}
        </motion.div>
        <motion.div
          className={styles.filterBlock}
          layout
          variants={variants}
          initial={isOpened.price ? 'visible' : 'hidden'}
          animate={isOpened.price ? 'visible' : 'hidden'}
        >
          <div className={styles.filterBlockTop} onClick={() => handleChangeOpen('price')}>
            <h5 className={cn(styles.filterBlockTitle, "title-s")}>
              Цена
            </h5>
            <ArrowIcon className={cn(styles.arrow, {[styles.reverced]: isOpened.price})} />
          </div>
          <motion.div className={styles.filterBlockContent} variants={variantsChildren}>
            <div className={styles.filterBlockInputs}>
              <div className={styles.filterBlockInput}>
                {thumbValue[0]} ₽
              </div>
              <span className={styles.filterBlockLine}></span>
              <div className={styles.filterBlockInput}>
                {thumbValue[1]} ₽
              </div>
            </div>
            <ReactSlider
              className={styles.range}
              thumbClassName={styles.rangeThumb}
              trackClassName={styles.rangeTrack}
              defaultValue={defaultPrice}
              min={price.min}
              max={price.max}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => {
                // state.value = thumbValue;
                return <div {...props} key={state.index}></div>
              }}
              pearling
              minDistance={50}
              onChange={(value) => {
                setThumbValue(value)
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
        <Button onClick={resetFilters} className={styles.filterButton} appearance="ghost" size="fullWidth">
          Сбросить
        </Button>
      </div>
    </aside>
  );
}