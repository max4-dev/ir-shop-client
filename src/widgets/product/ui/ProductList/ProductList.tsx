"use client";

import cn from "classnames";
import { useEffect, useReducer, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useAppDispatch, useTypedSelector } from "@/src/shared/hooks";
import { defaultLimit } from "@/src/features/products-actions/const";
import { useProducts } from "@/src/entities/product/hooks/useProducts";
import { useProductsFilter, useProductsPaginate, useProductsSearch } from "@/src/features/products-actions/hooks";
import { sortReducer } from "@/src/features/products-actions/ui/Sort/sortReducer";
import { setActivePage, setCatalogCountPages } from "@/src/features/products-actions/model";
import { Button, Loader } from "@/src/shared/ui";
import { IProduct } from "@/src/entities/product/types";
import { Product } from "@/src/entities/product/ui";
import { Pagination } from "@/src/features/products-actions/ui";

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
  console.log(data);
  
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
