"use client";

import { useProducts } from "@/src/entities/product/model";
import { Product } from "@/src/entities/product/ui";
import { AddToCartButton } from "@/src/features/cart/ui";
import { FavoriteButton } from "@/src/features/favorite/ui";

export const HomePage = () => {
  const { data: products } = useProducts();

  if (!products) {
    return null;
  }
  return (
    <>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          favoriteButtonSlot={<FavoriteButton itemId={product.id} />}
          cartButtonSlot={<AddToCartButton itemId={product.id} />}
        />
      ))}
    </>
  );
};
