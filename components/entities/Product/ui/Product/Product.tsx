import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addProduct, removeProduct } from "@/redux/favorites/slice";
import { addCartProduct } from "@/redux/cart/slice";
import { Icon } from "@/components/shared/ui";

import { ProductProps } from "./Product.props";
import styles from "./Product.module.scss";

export const Product = ({
  salePercent = 0,
  price,
  categories = [],
  title,
  id,
  images,
  inStock,
  priceWithSale,
  className,
  ...props
}: ProductProps) => {
  const dispatch = useAppDispatch();
  const { favoriteProducts } = useAppSelector((state) => state.favorites);
  const cart = useAppSelector((state) => state.cart);
  const cartItem = cart.products.find((product: { id: string }) => product.id === id);
  const addedCount = cartItem ? cartItem.count : 0;

  const isFavorit = useMemo(() => {
    return Boolean(favoriteProducts.find((product) => product.id === id));
  }, [favoriteProducts, id]);

  const toggleFavorite = () => {
    if (!isFavorit) {
      return dispatch(addProduct({ id }));
    }

    return dispatch(removeProduct({ id }));
  };

  return (
    <div className={cn(styles.product, className)} {...props}>
      {salePercent > 0 && <div className={styles.productSale}>-{salePercent}%</div>}
      <button onClick={toggleFavorite} className={styles.productFavorite}>
        <Icon.FavoriteIcon
          className={cn(styles.productFavoriteIcon, {
            [styles.productFavoriteIconActive]: isFavorit,
          })}
        />
      </button>
      <Image
        className={styles.productImg}
        priority={true}
        src={images[0]}
        width={182}
        height={184}
        alt=""
      />
      <Link className={styles.productName} href={`product/${id}`}>
        {title}
      </Link>
      {categories &&
        categories.map((category) => (
          <div className={styles.productType} key={category}>
            <p className={styles.productTypeText}>Тип:</p>
            <div className={styles.productTypeBadges}>
              <span className={styles.productTypeBadge}>{category}</span>
            </div>
          </div>
        ))}
      <div className={styles.productBottom}>
        <div className={styles.productPrice}>
          {salePercent > 0 ? (
            <div className={styles.productPriceSale}>
              <span className={cn(styles.newPrice, styles.price)}>{priceWithSale} ₽</span>
              <span className={styles.oldPrice}>{price} ₽</span>
            </div>
          ) : (
            <span className={styles.price}>{price} ₽</span>
          )}
        </div>
        {inStock && (
          <button
            onClick={() => dispatch(addCartProduct({ id, count: addedCount }))}
            className={styles.productCartButton}
          >
            {addedCount > 0 && <span className={styles.productCartCount}>{addedCount}</span>}
            <Icon.CartIcon />
          </button>
        )}
      </div>
    </div>
  );
};
