"use client"

import cn from "classnames";
import ReactSlider from "react-slider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";

import ArrowIcon from '@/public/images/icons/arrow.svg'
import { Checkbox, Button } from "@/components/shared/ui";
import { getCategories } from "@/components/entities/Category/handler";

import { FilterProps, IIsOpened } from "./Filter.props";
import styles from './Filter.module.scss';

const price = {
  min: 0,
  max: 500
}

export const Filter = ({ className, ...props }: FilterProps) => {
  const [thumbValue, setThumbValue] = useState([price.min, price.max]);
  const [isOpened, setOpened] =  useState<IIsOpened>({ type: true, price: true })
  const categories = useQuery({queryKey: ['categories'], queryFn: getCategories.getAll});

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
            <button className={styles.selectButton}>Выбрать все</button>
            <ul className={styles.select}>
              {categories.data.map((category) => (
                <Checkbox key={category.id} className={styles.selectItem}>
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
              defaultValue={[price.min, price.max]}
              min={price.min}
              max={price.max}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => <div {...props} key={state.index}></div>}
              pearling
              minDistance={50}
              onChange={(value) => {
                setThumbValue(value)
              }}
          />
          </motion.div>
        </motion.div>
      </div>
      <div className={styles.filterButtons}>
        <Button className={styles.filterButton} size="fullWidth">
          Показать
        </Button>
        <Button className={styles.filterButton} appearance="ghost" size="fullWidth">
          Сбросить
        </Button>
      </div>
    </aside>
  );
}