'use client'

import { Filter, Sort } from '@/components/widgets';
import { ProductList } from '@/components/layouts';

import styles from './Home.module.scss';

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
