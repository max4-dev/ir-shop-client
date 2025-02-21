"use client";

import cn from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

import { useTypedSelector } from "@/src/shared/hooks";
import { useProducts } from "@/src/entities/product/hooks";
import { IProduct } from "@/src/entities/product/types";
import { Loader } from "@/src/shared/ui";
import { Product } from "@/src/entities/product/ui";

import styles from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const { favoriteProducts } = useTypedSelector((state) => state.favorites);
  const { data, isLoading } = useProducts();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (!data) {
      return;
    }

    const products = favoriteProducts
      .map((product) => {
        const foundedProduct = data.find((fovoriteProduct) => fovoriteProduct.id === product.id);

        if (!foundedProduct) {
          return null;
        }

        return foundedProduct;
      })
      .filter((product): product is IProduct => product !== null);

    setProducts(products);
  }, [data, favoriteProducts]);

  if (isLoading) {
    return <Loader />;
  }

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return <h3 className={cn("title-b", styles.favoritesNotFoundTitle)}>Список избранного пуст</h3>;
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
};

export default FavoritesPage;
