import './ProductList.css';
import Product from '../product/Product.jsx';
import Pagination from '../../../../components/pagination/Pagination.jsx';
import { isEmpty } from 'lodash';
import Sort from '../../../../components/sort/Sort.jsx';
import { sortOptions } from '../../components/filter/models/sort-options.js';
import ProductFilter from '../filter/ProductFilter.jsx';
import { baseFiltersOptions } from '../filter/models/filter-options.js';
import { productQueryParams } from './product-query-params.js';
import useQueryParams from '../../../../hooks/use-query-params.jsx';
import Spinner from '../../../../components/spinner/Spinner.jsx';
import { useFetchData } from '../../../../hooks/use-fetch-data.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductService from '../../../../services/product.service.js';

const ProductList = () => {
  const navigate = useNavigate();
  const { getQueryParams } = useQueryParams();

  const [page, limit, sortOption, type, manufacturer] = getQueryParams(
    ...productQueryParams
  );

  const prepareQueryParams = (newPage, newSortOption) => {
    let queryUrl = `?page=${newPage}&limit=${limit}&sortOption=${newSortOption}`;
    queryUrl += !isEmpty(type) ? `&type=${type?.join('&type=')}` : '';
    queryUrl += !isEmpty(manufacturer)
      ? `&manufacturer=${manufacturer?.join('&manufacturer=')}`
      : '';

    return queryUrl;
  };

  const [productData, isProductsPending] = useFetchData(
    `products/paginated/${prepareQueryParams(page, sortOption)}`
  );

  const [isFiltersPending, setIsFiltersPending] = useState(false);

  // This hook must be fired only one time
  useEffect(() => {
    const fetchFiltersData = async () => {
      setIsFiltersPending(true);

      const filtersData = await ProductService.getFiltersData();

      baseFiltersOptions.forEach((filter) => {
        filter.options = filtersData[filter.type];
        filter.selected = filter.type === 'type' ? type : manufacturer;
      });

      setIsFiltersPending(false);
    };

    fetchFiltersData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePagination = (newPage) => {
    const newUrl = prepareQueryParams(newPage, sortOption);
    navigate(newUrl);
  };

  const handleSort = (newSortOption) => {
    const newUrl = prepareQueryParams(page, newSortOption);
    navigate(newUrl);
  };

  const handleFilter = (newFilterValues) => {
    navigate(
      `/?page=${page}&limit=${limit}&sortOption=${sortOption}${newFilterValues}`
    );
  };

  return (
    <>
      {true && (
        <div className="filter-contaner">
          <Sort
            handleChange={handleSort}
            currentValue={sortOption}
            sortOptions={sortOptions}
          />
          {!isFiltersPending && (
            <ProductFilter
              filters={baseFiltersOptions}
              handleFilter={handleFilter}
            />
          )}
        </div>
      )}

      <h1 className="list-title">Product List</h1>

      {isProductsPending && (
        <div className="spinner">
          <Spinner />
        </div>
      )}

      {!(isProductsPending || isEmpty(productData)) && (
        <div className="product-list-container">
          <div className="list">
            {!isEmpty(productData.products) &&
              productData.products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            {isEmpty(productData.products) && (
              <div>
                There are no products yet or you submitted an incorrect request.
              </div>
            )}
          </div>
          <div className="list-paginator">
            {!isEmpty(productData.products) && (
              <Pagination
                data={{ page, limit, count: productData.count }}
                handlePageClick={handlePagination}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
