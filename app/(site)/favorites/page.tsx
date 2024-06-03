"use client";

import cn from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/store";
import { Product } from "@/components/entities/product/ui";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/components/entities/product/ui/Product/Product.props";
import { Loader } from "@/components/shared/ui";

import styles from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const { favoriteProducts } = useAppSelector((state) => state.favorites);
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
    return <h3 className={cn("title-b", styles.favoritesNotFoundTitle)}>Товары не найдены</h3>;
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
