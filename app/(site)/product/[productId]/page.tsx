"use client";

import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/shared/ui';
import { ProductSlider } from '@/components/widgets';

import styles from './ProductPage.module.scss';

interface ProductPageProps {
  params: { productId: string }
}

const ProductPage = ({ params }: ProductPageProps ) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return ( 
    <div className="container">
      <div className={styles.productPage}>
        <h3 className={cn(styles.productPageTitle, "title-m")}>
          Цветы 24\24 см
        </h3>
        <div className={styles.productPageBox}>
          <div className={styles.productPageSlider}>
            <ProductSlider thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} />
          </div>
          <div className={styles.productPageContent}>
            <p className={styles.productPagePrice}>
              300 ₽
            </p>
            <p className={cn(styles.productPageStatus, styles.statusStock, styles.statusOutStock)}>
              В наличии
            </p>
            <p className={styles.productPageVendor}>
              Артикул: 61010212
            </p>
            <div className={styles.productPageTypeBadges}>
              <span className={styles.productPageTypeBadge}>
                цветы
              </span>
              <span className={styles.productPageTypeBadge}>
                цветы
              </span>
            </div>
            <div className={styles.productPageButtons}>
              <Button size='big'>
                Положить в корзину
              </Button>
              <button className={styles.productPageFavorite}>
                <Image src='/images/icons/favorite.svg' alt="Корзина" width={26} height={23} />
              </button>
            </div>
            <div className={styles.productPageDescription}>
              <h5>Описание</h5>
              <p>
                Одной из главных составляющих котла является циркуляционный насос. Он  перекачивает теплоноситель по замкнутому контуру.
              </p>
              <p>
                В газовых котлах используются центробежные циркуляционные насосы с «мокрым ротором». Основные его части : корпус, статор, ротор, вал, крыльчатка (технополимер), стальная гильза, задняя часть (улитка), клеммная  коробка.
              </p>
              <p>
                Голова и задняя часть (улитка)- это основные узлы  насоса. Внутри улитки циркуляционного насоса происходит контакт лопастей колеса с теплоносителем, статор насоса отделен стальной гильзой. Сам ротор крепится на торцевых подшипниках, которые выполнены из графита или керамики. Охлаждение и смазка подшипников происходит при помощи воды.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ProductPage;