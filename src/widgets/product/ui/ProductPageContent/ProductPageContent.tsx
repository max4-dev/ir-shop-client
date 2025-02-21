import cn from "classnames";
import { useMemo } from "react";

import { useAppDispatch, useTypedSelector } from "@/src/shared/hooks";
import { addProduct, removeProduct } from "@/src/entities/favorites/model";
import { Button, Icon } from "@/src/shared/ui";
import { addCartProduct } from "@/src/entities/cart/model";

import { ProductPageContentProps } from "./ProductPageContent.props";
import styles from "./ProductPageContent.module.scss";

enum StockStatus {
  IN_STOCK = "В наличии",
  OUT_STOCK = "Нет в наличии",
}

export const ProductPageContent = ({
  className,
  id,
  inStock,
  categories,
  priceWithSale,
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  salePercent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createdAt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatedAt,
  ...props
}: ProductPageContentProps) => {
  const dispatch = useAppDispatch();
  const { favoriteProducts } = useTypedSelector((state) => state.favorites);
  const cart = useTypedSelector((state) => state.cart);
  const cartItem = cart.products.find((product: { id: string }) => product.id === id);
  const addedCount = cartItem ? cartItem.count : 0;

  const isFavorit = useMemo(() => {
    return Boolean(favoriteProducts.find((product) => product.id === id));
  }, [favoriteProducts, id]);

  const toggleFavorite = () => {
    if (!id) {
      return;
    }

    if (!isFavorit) {
      dispatch(addProduct({ id }));
      return;
    }

    dispatch(removeProduct({ id }));
  };

  return (
    <div className={cn(className, styles.productPageContent)} {...props}>
      <p className={styles.productPagePrice}>{priceWithSale} ₽</p>
      {inStock ? (
        <p className={cn(styles.productPageStatus, styles.statusStock)}>{StockStatus.IN_STOCK}</p>
      ) : (
        <p className={cn(styles.productPageStatus, styles.statusOutStock)}>
          {StockStatus.OUT_STOCK}
        </p>
      )}
      <p className={styles.productPageVendor}>Артикул: {id}</p>
      {categories &&
        categories.map((category) => (
          <div className={styles.productPageTypeBadges} key={category}>
            <div className={styles.productTypeBadges}>
              <span className={styles.productPageTypeBadge}>{category}</span>
            </div>
          </div>
        ))}
      <div className={styles.productPageButtons}>
        {inStock && (
          <Button
            onClick={() => dispatch(addCartProduct({ id, count: addedCount }))}
            className={styles.productPageCartButton}
            size="big"
            icon={"CartIcon"}
          >
            {addedCount > 0 && <span className={styles.productPageCartCount}>{addedCount}</span>}
            Положить в корзину
          </Button>
        )}
        <button onClick={toggleFavorite} className={styles.productPageFavorite}>
          <Icon.FavoriteIcon
            className={cn(styles.favoriteIcon, {
              [styles.favoriteIconActive]: isFavorit,
            })}
          />
        </button>
      </div>
      {description && (
        <div className={styles.productPageDescription}>
          <h5>Описание</h5>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
