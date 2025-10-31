import cn from "classnames";

import { selectAddToCart, useCartItem, useCartStore } from "@/src/entities/cart/model";
import { Icon } from "@/src/shared/assets";

import styles from "./AddToCartButton.module.scss";
import { AddToCartButtonProps } from "./AddToCartButton.props";

export const AddToCartButton = ({ className, onClick, itemId, ...props }: AddToCartButtonProps) => {
  const cartItem = useCartItem(itemId);
  const addToCart = useCartStore(selectAddToCart);

  const handleAddToCart = () => {
    addToCart({ id: itemId, count: 1 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    handleAddToCart();
  };
  return (
    <button className={cn(className, styles.cart)} onClick={handleClick} {...props}>
      {cartItem && cartItem.count > 0 && (
        <span className={styles.cartCount}>{cartItem.count}</span>
      )}
      <Icon.CartIcon />
    </button>
  );
};
