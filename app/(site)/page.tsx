'use client'

import Filter from '@/components/widgets/Filter/Filter';
import styles from './Home.module.scss';

export default function Home() {

  return (
    <div className={styles.home}>
      <div className="container">
        <Filter />
      </div>
    </div>
  )
}
