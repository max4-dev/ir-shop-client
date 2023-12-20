import { FilterProps } from "./Filter.props";
import cn from "classnames";
import styles from './Filter.module.scss';
import ArrowIcon from '@/public/images/icons/arrow.svg'
import Button from "@/components/ui/Button/Button";
import ReactSlider from "react-slider";
import { useState } from "react";

const price = {
  min: 0,
  max: 500
}

const Filter = ({ className, ...props }: FilterProps) => {
  const [thumbValue, setThumbValue] = useState([price.min, price.max]);
  

  return (
    <aside className={cn(styles.filter, className)} {...props}>
      <h4 className={cn(styles.title, "title-m")}>
        Фильтры
      </h4>
      <div className={styles.filterBloks}>
        <div className={styles.filterBlock}>
          <div className={styles.filterBlockTop}>
            <h5 className={cn(styles.filterBlockTitle, "title-s")}>
              Тип
            </h5>
            <ArrowIcon />
          </div>
          <div className={styles.filterBlockContent}>
            <button className={styles.selectButton}>Выбрать все</button>
            <ul className={styles.select}>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
              <li className={styles.selectItem}>
                <label className={styles.selectLabel}>
                  <input className={styles.selectInput} type="checkbox" />
                  <span className={styles.selectCheckbox}></span>
                  <p className={styles.selectText}>Тип 1</p>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.filterBlock}>
          <div className={styles.filterBlockTop}>
            <h5 className={cn(styles.filterBlockTitle, "title-s")}>
              Цена
            </h5>
            <ArrowIcon />
          </div>
          <div className={styles.filterBlockContent}>
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
          </div>
        </div>
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
 
export default Filter;