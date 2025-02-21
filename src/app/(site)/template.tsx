"use client";

import { useEffect } from "react";

import { setCartProducts, setTotal } from "@/src/entities/cart/model";
import { IProductForCart } from "@/src/entities/cart/model/cart/types";
import { useProducts } from "@/src/entities/product/hooks";
import { useAuth } from "@/src/features/auth/hooks";
import { useActions, useAppDispatch, useRetryRequest, useTypedSelector } from "@/src/shared/hooks";

function SiteTemplate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { products } = useTypedSelector((state) => state.cart);
  const { data: productsData } = useProducts();
  
  const { getProfile } = useActions();
  const { user } = useAuth();

  const { setRetry } = useRetryRequest({ requestFn: getProfile, user });

  useEffect(() => {
    setRetry(false);
  }, []);

  useEffect(() => {
    if (!productsData) {
      return;
    }

    const cartProducts = products
      .map((product) => {
        const foundProduct = productsData.find((cartProduct) => cartProduct.id === product.id);

        if (!foundProduct) return null;

        return { ...foundProduct, count: product.count ?? 0 };
      })
      .filter((product): product is IProductForCart => product !== null);

    dispatch(setCartProducts(cartProducts));
    dispatch(setTotal());
  }, [productsData, dispatch, products]);

  return <>{children}</>;
}

export default SiteTemplate;
