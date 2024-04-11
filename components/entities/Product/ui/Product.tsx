import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addProduct, removeProduct } from "@/redux/favorites/slice";
import FavoriteIcon from  "@/assets/icons/favorite.svg";

import { ProductProps } from "./Product.props";
import styles from "./Product.module.scss";

export const Product = ({ salePercent = 0, price, categories = [], title, id, images, inStock, priceWithSale, slug, rating, className, ...props }: ProductProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.favorites);

  const isFavorit = useMemo(() => {
    return Boolean(products.find(product => product.id === id));
  }, [products, id]);

  const toggleFavorite = () => {
    if (!isFavorit) {
      return dispatch(addProduct({
        salePercent,
        price,
        categories,
        title,
        id,
        images,
        inStock,
        priceWithSale,
        slug,
        rating,
      }))
    }

    return dispatch(removeProduct({ id }))
  }

  

  // useEffect(() => {
  //   setFavorite(Boolean(products.find(product => product.id === id)));
  // }, [products]);

  return (
    <div className={cn(styles.product, className)} {...props}>
      {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
      <button onClick={toggleFavorite} className={styles.productFavorite}>
        <FavoriteIcon className={cn(styles.productFavoriteIcon, {[styles.productFavoriteIconActive]: isFavorit})} />
      </button>
      <Image
        className={styles.productImg}
        priority={true}
        src={images[0]}
        width={182}
        height={184}
        alt="" 
      />
      <Link
        className={styles.productName}
        href={`product/${id}`}
      >
        {title}
      </Link>
      {categories && categories.map(category => (
        <div className={styles.productType} key={category}>
          <p className={styles.productTypeText}>Тип:</p>
          <div className={styles.productTypeBadges}>
            <span className={styles.productTypeBadge}>
              {category}
            </span>
          </div>
        </div>
      ))
      }
      <div className={styles.productBottom}>
        <div className={styles.productPrice}>
          {salePercent > 0 ?
          <div className={styles.productPriceSale}>
            <span className={cn(styles.newPrice, styles.price)}>{priceWithSale} ₽</span>
            <span className={styles.oldPrice}>{price} ₽</span>
          </div>
          : 
          <span className={styles.price}>{price} ₽</span>}
        </div>
        {inStock && <button className={styles.productCartButton}>
          <Image src='/images/icons/cart.svg' alt="Корзина" width={23} height={23} />
        </button>}
      </div>
    </div>
  )
}