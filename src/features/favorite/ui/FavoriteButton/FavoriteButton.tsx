import cn from "classnames";

import {
  selectAddFavorite,
  useFavoritesStore,
  useIsFavorite,
} from "@/src/entities/favorite/model";
import { Icon } from "@/src/shared/assets";

import styles from "./FavoriteButton.module.scss";
import { FavoriteButtonProps } from "./FavoriteButton.props";

export const FavoriteButton = ({ className, itemId, onClick, ...props }: FavoriteButtonProps) => {
  const isFavorite = useIsFavorite(itemId);
  const addToFavorite = useFavoritesStore(selectAddFavorite);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    addToFavorite(itemId);
  };

  return (
    <button className={cn(className, styles.favorite)} onClick={handleClick} {...props}>
      <Icon.FavoriteIcon
        className={cn(styles.favoriteIcon, {
          [styles.favoriteIconActive]: isFavorite,
        })}
      />
    </button>
  );
};
