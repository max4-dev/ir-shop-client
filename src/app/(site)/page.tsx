"use client";

import { useState } from "react";

import { useWindowSize } from "@/src/shared/hooks";
import { Icon, Popup } from "@/src/shared/ui";
import { Sort } from "@/src/features/products-actions/ui";
import { Filter } from "@/src/widgets/filter/ui";
import { ProductList } from "@/src/widgets/product/ui";

import styles from "./Home.module.scss";

export default function Home() {
  const { width } = useWindowSize();
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const isMobile = Boolean(width && width <= 1280);

  return (
    <div className={styles.home}>
      <div className="container">
        <div className={styles.top}>
          {isMobile && (
            <button
              className={styles.filterButton}
              onClick={() => setFilterOpen((prevState) => !prevState)}
            >
              <Icon.FilterIcon />
            </button>
          )}
          <Sort />
        </div>
        <div className={styles.content}>
          {isMobile ? (
            <Popup isOpen={isFilterOpen} setIsOpen={setFilterOpen}>
              <Filter className={styles.filter} setFilterOpen={setFilterOpen} />
            </Popup>
          ) : (
            <Filter />
          )}
          <ProductList />
        </div>
      </div>
    </div>
  );
}
