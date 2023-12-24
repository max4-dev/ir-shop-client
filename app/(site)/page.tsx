'use client'

import Filter from '@/components/widgets/Filter/Filter';
import styles from './Home.module.scss';
import Sort from '@/components/widgets/Sort/Sort';
import ProductList from '@/components/layouts/ProductList/ProductList';

export default function Home() {

  return (
    <div className={styles.home}>
      <div className="container">
        <Sort />
        <div className={styles.content}>
          <Filter />
          <ProductList />
        </div>
      </div>
    </div>
  )
}
