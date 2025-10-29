"use client";

import { useProducts } from "@/src/entities/product/model";

export const HomePage = () => {
  const { data: products } = useProducts();
  console.log(products);

  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>{product.price}</div>
          </div>
        ))}
      {/* <LoginForm /> */}
      {/* <Swiper slidesPerView={1}>
        <SwiperSlide>
          <div className={styles.block}>1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.block}>2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.block}>34</div>
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
};
