"use client";

import cn from "classnames";
import { useEffect, useReducer, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Product } from "@/components/entities/product/ui";
import { Button, Loader, Pagination } from "@/components/shared/ui";
import { sortReducer } from "@/components/widgets/Sort/sortReducer";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/components/entities/product/ui/Product/Product.props";
import { useAppDispatch } from "@/redux/store";
import { setActivePage, setCatalogCountPages } from "@/redux/filter/slice";
import { useProductsSearch } from "@/hooks/useProductsSearch";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import { defaultLimit } from "@/helpers/const/defaultLimit";
import { useProductsPaginate } from "@/hooks/useProductsPaginate";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { ProductListProps } from "./ProductList.props";
import styles from "./ProductList.module.scss";

export const ProductList = ({ className, ...props }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const { filter, activePage, catalogCountPages } = useTypedSelector((state) => state.filter);
  const { sort } = useTypedSelector((state) => state.sort);
  const { search } = useTypedSelector((state) => state.search);

  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(defaultLimit);
  const [isMoreProducts, setMoreProducts] = useState(false);

  const { data } = useProducts();
  const { filteredProducts } = useProductsFilter({ filter, products: data });
  const { searchedProducts } = useProductsSearch({ search, products: filteredProducts });
  const [parent] = useAutoAnimate();

  const [{ products: sortedProducts }, dispatchSort] = useReducer(sortReducer, {
    sort: sort.type,
    products: filteredProducts,
  });

  const { paginateProducts, pageCount } = useProductsPaginate({
    limit,
    activePage,
    products: sortedProducts,
  });

  useEffect(() => {
    dispatchSort({ type: sort.type, products: searchedProducts });
  }, [sort.type, searchedProducts]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [sort.type, search, filter.categories.length, filter.price, dispatch]);

  useEffect(() => {
    setLimit(defaultLimit);
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (paginateProducts && paginateProducts.length > 0) {
      setLoading(false);
    }
  }, [paginateProducts]);

  useEffect(() => {
    dispatch(setCatalogCountPages(pageCount));
  }, [dispatch, pageCount]);

  useEffect(() => {
    setMoreProducts((sortedProducts?.length ?? 0) > limit * activePage && activePage === 1);
  }, [sortedProducts, limit, activePage]);

  const loadMoreProducts = () => {
    if (sortedProducts && limit + defaultLimit > sortedProducts.length) {
      setLimit(sortedProducts.length);
    } else {
      setLimit((prevState) => prevState + defaultLimit);
    }
  };

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (!isLoading && (!paginateProducts || paginateProducts.length === 0)) {
    return <h3 className={cn("title-b", styles.productListNotFoundTitle)}>Товары не найдены</h3>;
  }

  return (
    <div className={cn(styles.productList, className)} {...props}>
      <div ref={parent} className={styles.productListItems}>
        {paginateProducts &&
          paginateProducts.map((product: IProduct) => (
            <Product className={styles.productListItem} key={product.id} {...product} />
          ))}
      </div>
      <div className={styles.productListButtonBox}>
        {isMoreProducts && (
          <Button onClick={loadMoreProducts} size="big">
            Загрузить еще
          </Button>
        )}
      </div>
      {catalogCountPages > 1 && (
        <Pagination
          className={styles.pagination}
          pagesCount={catalogCountPages}
          currentPage={activePage}
        />
      )}
    </div>
  );
};
