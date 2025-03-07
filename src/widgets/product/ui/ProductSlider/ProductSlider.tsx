"use client";

import cn from "classnames";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Scrollbar } from "swiper/modules";

import { ProductSliderProps } from "./ProductSlider.props";
import styles from "./ProductSlider.module.scss";

import "swiper/css";
import "@/src/app/scss/slider/slider.scss";

const breakpoints = {
  0: {
    slidesPerView: 1.5,
  },
  320: {
    slidesPerView: 2,
  },
  400: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
};

export const ProductSlider = ({
  images,
  thumbsSwiper,
  setThumbsSwiper,
  className,
  ...props
}: ProductSliderProps) => {
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
        {images.map((image, index) => (
          <SwiperSlide className={styles.sliderImg} key={index}>
            <Image className={styles.productImg} src={image} width={648} height={455} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={3.5}
        freeMode={true}
        scrollbar={{
          hide: false,
        }}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        breakpoints={breakpoints}
        className={styles.sliderThumbs}
      >
        {images.map((image, index) => (
          <SwiperSlide className={styles.sliderThumb} key={index}>
            <Image className={styles.productImg} src={image} width={166} height={149} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
