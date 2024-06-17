"use client";

import cn from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Swiper } from "swiper/types";

import { Loader } from "@/components/shared/ui";
import { ProductSlider } from "@/components/widgets";
import { getProducts } from "@/components/entities/product/handler";
import { ProductPageContent } from "@/components/widgets/ProductPageContent/ProductPageContent";

import styles from "./ProductPage.module.scss";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const { productId } = params;

  if (!productId) {
    notFound();
  }

  const { data, isLoading } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getProducts.getById(productId),
  });

  if (isLoading) {
    return <Loader />;
  }

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
              <ProductPageContent {...data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
