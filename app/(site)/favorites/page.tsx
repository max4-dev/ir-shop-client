"use client";

import cn from 'classnames';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { useAppSelector } from '@/redux/store';
import { Product } from '@/components/entities';


import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const { products } = useAppSelector((state) => state.favorites);
  const [parent] = useAutoAnimate()

  if (!products || products.length === 0) {
    return (
      <h3 className={cn("title-b", styles.favoritesNotFoundTitle)}>Товары не найдены</h3>
    )
  }

  return (
    <div className={styles.favorites}>
      <div className="container">
        <div ref={parent} className={styles.favoritesList}>
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default FavoritesPage;