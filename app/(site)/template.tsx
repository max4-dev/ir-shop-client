"use client";

import { useEffect } from "react";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setCartProducts, setTotal } from "@/redux/cart/slice";
import { useProducts } from "@/hooks/useProducts";
import { IProductForCart } from "@/redux/cart/types";
import { useAppDispatch } from "@/redux/store";
import useRetryRequest from "@/hooks/useRetryRequest";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";

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
