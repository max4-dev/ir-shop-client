"use client";

import cn from 'classnames';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';

import { ProductSliderProps } from "./ProductSlider.props";
import styles from './ProductSlider.module.scss';

import 'swiper/css';

export const ProductSlider = ({ className, ...props }: ProductSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return ( 
    <div className={cn(styles.slider, className)} {...props}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        allowTouchMove={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.sliderBig}
      >
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderImg}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={648} height={455} alt="" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={3.5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.sliderThumbs}
      >
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/1.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderThumb}>
          <Image className={styles.productImg} src="/images/products/2.jpg" width={166} height={149} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
   );
}