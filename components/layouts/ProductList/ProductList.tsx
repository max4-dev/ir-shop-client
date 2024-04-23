import cn from "classnames";
import { useEffect, useReducer, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Product } from "@/components/widgets";
import { Button, Pagination } from "@/components/shared/ui";
import { sortReducer } from "@/components/widgets/Sort/sortReducer";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/components/entities/Product/ui/Product.props";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setActivePage, setCatalogCountPages } from "@/redux/filter/slice";
import { paginate } from "@/helpers/paginate";
import { Loader } from "@/components/shared/ui/Loader/Loader";

import { FilterType, ProductListProps } from "./ProductList.props";
import styles from "./ProductList.module.scss";

const defaultLimit = 9;

export const ProductList = ({ className, ...props }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const { sort, filter, search, activePage, catalogCountPages } = useAppSelector(
    (state) => state.filter
  );

  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(defaultLimit);
  const [isMoreProducts, setMoreProducts] = useState(false);
  const [products, setProducts] = useState<IProduct[] | undefined>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProduct[] | undefined>([]);
  const [paginateProducts, setPaginateProducts] = useState<IProduct[] | undefined>([]);
  const [parent] = useAutoAnimate();

  const { data } = useProducts();

  const [{ products: sortedProducts }, dispatchSort] = useReducer(sortReducer, {
    sort: sort.type,
    products,
  });

  const searchProducts = () => {
    if (search.length === 0) {
      return products;
    }

    return (
      products &&
      products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  const filterProducts = ({ products, filter }: FilterType) => {
    return {
      filteredProducts:
        products &&
        products
          .filter((product: IProduct) => {
            if (filter.categories.length !== 0) {
              return filter.categories.some((category: string) => {
                return product.categories && product.categories.includes(category);
              });
            }

            return products;
          })
          .filter((product: IProduct) => {
            return (
              product.priceWithSale >= filter.price[0] && product.priceWithSale <= filter.price[1]
            );
          }),
    };
  };

  const loadMoreProducts = () => {
    if (sortedProducts && limit + defaultLimit > sortedProducts.length) {
      return setLimit(sortedProducts.length);
    }
    return setLimit((prevState) => prevState + defaultLimit);
  };

  useEffect(() => {
    dispatchSort({ type: sort.type, products: searchedProducts });
  }, [sort, searchedProducts]);

  useEffect(() => {
    const { filteredProducts } = filterProducts({ products: data, filter });

    setProducts(filteredProducts);
  }, [data, filter]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [sort, filter.categories.length, filter.price, dispatch]);

  useEffect(() => {
    const searchedProducts = searchProducts();

    setSearchedProducts(searchedProducts);
  }, [search, products]);

  useEffect(() => {
    if (sortedProducts) {
      const { sliceItems, pageCount } = paginate({
        activePage,
        limit,
        products: sortedProducts,
        defaultLimit,
      });
      dispatch(setCatalogCountPages(pageCount));

      setMoreProducts(sortedProducts.length > limit * activePage && activePage === 1);
      setPaginateProducts(sliceItems);
    }
  }, [sortedProducts, products, activePage, limit, dispatch]);

  useEffect(() => {
    setLimit(defaultLimit);
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (paginateProducts && paginateProducts.length > 0) {
      setLoading(false);
    }
  }, [paginateProducts]);

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
