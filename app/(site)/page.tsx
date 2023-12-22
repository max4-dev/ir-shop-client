'use client'

import Filter from '@/components/widgets/Filter/Filter';
import styles from './Home.module.scss';
import Sort from '@/components/widgets/Sort/Sort';

export default function Home() {

  return (
    <div className={styles.home}>
      <div className="container">
        <Sort />
        <Filter />
      </div>
    </div>
  )
}
