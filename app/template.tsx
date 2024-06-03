"use client";

import { useEffect } from "react";

import { Footer, Header } from "@/components/layouts";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import "@/scss/style.scss";
import { setCartProducts, setTotal } from "@/redux/cart/slice";
import { useProducts } from "@/hooks/useProducts";
import { IProductForCart } from "@/redux/cart/types";
import { useAppDispatch } from "@/redux/store";

function RootTemplate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { products } = useTypedSelector((state) => state.cart);
  const { data } = useProducts();

  useEffect(() => {
    if (!data) {
      return;
    }

    const cartProducts = products
      .map((product) => {
        const foundedProduct = data.find((cartProduct) => cartProduct.id === product.id);

        if (!foundedProduct) {
          return null;
        }

        return { ...foundedProduct, count: product.count ?? 0 };
      })
      .filter((product): product is IProductForCart => product !== null);

    dispatch(setCartProducts(cartProducts));
    dispatch(setTotal());
  }, [data, dispatch, products]);

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}

export default RootTemplate;
