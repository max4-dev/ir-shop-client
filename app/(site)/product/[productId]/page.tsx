"use client";

/* eslint-disable consistent-return */

import cn from "classnames";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Swiper } from "swiper/types";

import { Button } from "@/components/shared/ui";
import { ProductSlider } from "@/components/widgets";
import { getProducts } from "@/components/entities/product/handler";
import FavoriteIcon from "@/assets/icons/favorite.svg";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addProduct, removeProduct } from "@/redux/favorites/slice";
import { addCartProduct } from "@/redux/cart/slice";

import styles from "./ProductPage.module.scss";

interface ProductPageProps {
  params: { productId: string };
}

enum StockStatus {
  IN_STOCK = "В наличии",
  OUT_STOCK = "Нет в наличии",
}

const ProductPage = ({ params }: ProductPageProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.favorites);
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const { productId } = params;
  const cart = useAppSelector((state) => state.cart);

  if (!productId) {
    notFound();
  }

  const { data } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getProducts.getById(productId),
  });

  const cartItem = cart.products.find((product: { id: string }) => product.id === data?.id);
  const addedCount = cartItem ? cartItem.count : 0;

  const isFavorit = useMemo(() => {
    return Boolean(products.find((product) => product.id === data?.id));
  }, [products, data?.id]);

  const toggleFavorite = () => {
    if (!data) {
      return;
    }

    if (!isFavorit) {
      return dispatch(addProduct(data));
    }

    return dispatch(removeProduct({ id: data.id }));
  };

  return (
    <>
      {data && (
        <div className="container">
          <div className={styles.productPage}>
            <h3 className={cn(styles.productPageTitle, "title-m")}>{data.title}</h3>
            <div className={styles.productPageBox}>
              <div className={styles.productPageSlider}>
                <ProductSlider
                  images={data.images}
                  thumbsSwiper={thumbsSwiper}
                  setThumbsSwiper={setThumbsSwiper}
                />
              </div>
              <div className={styles.productPageContent}>
                <p className={styles.productPagePrice}>{data.priceWithSale} ₽</p>
                {data.inStock ? (
                  <p className={cn(styles.productPageStatus, styles.statusStock)}>
                    {StockStatus.IN_STOCK}
                  </p>
                ) : (
                  <p className={cn(styles.productPageStatus, styles.statusOutStock)}>
                    {StockStatus.OUT_STOCK}
                  </p>
                )}
                <p className={styles.productPageVendor}>Артикул: {data.id}</p>
                {data.categories &&
                  data.categories.map((category) => (
                    <div className={styles.productPageTypeBadges} key={category}>
                      <div className={styles.productTypeBadges}>
                        <span className={styles.productPageTypeBadge}>{category}</span>
                      </div>
                    </div>
                  ))}
                <div className={styles.productPageButtons}>
                  {data.inStock && (
                    <Button
                      onClick={() => dispatch(addCartProduct(data))}
                      className={styles.productPageCartButton}
                      size="big"
                    >
                      {addedCount > 0 && (
                        <span className={styles.productPageCartCount}>{addedCount}</span>
                      )}
                      Положить в корзину
                    </Button>
                  )}
                  <button onClick={toggleFavorite} className={styles.productPageFavorite}>
                    <FavoriteIcon
                      className={cn(styles.favoriteIcon, {
                        [styles.favoriteIconActive]: isFavorit,
                      })}
                    />
                  </button>
                </div>
                <div className={styles.productPageDescription}>
                  <h5>Описание</h5>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
