"use client";

import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Swiper } from 'swiper/types';

import { Button } from '@/components/shared/ui';
import { ProductSlider } from '@/components/widgets';
import { getProducts } from '@/components/entities/Product/handler';

import styles from './ProductPage.module.scss';

interface ProductPageProps {
  params: { productId: string }
}

enum StockStatus {
  IN_STOCK = 'В наличии',
  OUT_STOCK = 'Нет в наличии',
}

const ProductPage = ({ params }: ProductPageProps ) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const { productId } = params;

  if (!productId) {
    notFound()
  }

  const { data } = useQuery({queryKey: [`product-${productId}`], queryFn: () => getProducts.getById(productId)});
  
  return (
    <>
      {data && <div className="container">
        <div className={styles.productPage}>
          <h3 className={cn(styles.productPageTitle, "title-m")}>
            {data.title}
          </h3>
          <div className={styles.productPageBox}>
            <div className={styles.productPageSlider}>
              <ProductSlider images={data.images} thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} />
            </div>
            <div className={styles.productPageContent}>
              <p className={styles.productPagePrice}>
                {data.priceWithSale} ₽
              </p>
              {data.inStock ? 
              <p className={cn(styles.productPageStatus, styles.statusStock)}>
                 {StockStatus.IN_STOCK}
              </p> : 
              <p className={cn(styles.productPageStatus, styles.statusOutStock)}>
                 {StockStatus.OUT_STOCK}
              </p>}
              <p className={styles.productPageVendor}>
                Артикул: {data.id}
              </p>
              {data.categories && data.categories.map(category => (
                <div className={styles.productPageTypeBadges} key={category}>
                  <div className={styles.productTypeBadges}>
                    <span className={styles.productPageTypeBadge}>
                      {category}
                    </span>
                  </div>
                </div>
              ))
              }
              <div className={styles.productPageButtons}>
                {data.inStock && <Button size='big'>
                  Положить в корзину
                </Button>}
                <button className={styles.productPageFavorite}>
                  <Image src='/images/icons/favorite.svg' alt="Корзина" width={26} height={23} />
                </button>
              </div>
              <div className={styles.productPageDescription}>
                <h5>Описание</h5>
                <p>
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
   );
}
 
export default ProductPage;