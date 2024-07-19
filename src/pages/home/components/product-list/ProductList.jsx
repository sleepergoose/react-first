import './ProductList.css';
import Product from '../product/Product.jsx';
import Pagination from '../../../../components/pagination/Pagination.jsx';
import { isEmpty } from 'lodash';
import Sort from '../../../../components/sort/Sort.jsx';
import { sortOptions } from '../../components/filter/models/sort-options.js';
import ProductFilter from '../filter/ProductFilter.jsx';
import { baseFiltersOptions } from '../filter/models/filter-options.js';

const ProductList = ({
  productsData,
  page,
  limit,
  sortOption,
  handleEvents,
}) => {
  const { count, products } = productsData;

  const handlePageClick = (clickedPage) => {
    if (handleEvents) {
      handleEvents(clickedPage, sortOption);
    }
  };

  const handleSort = (option) => {
    if (handleEvents) {
      handleEvents(page, option);
    }
  };

  const handleFilter = (filterParams) => {
    if (handleEvents) {
      handleEvents(page, sortOption, filterParams);
    }
  };

  return (
    <>
      <div className="filter-contaner">
        <Sort
          handleChange={handleSort}
          currentValue={sortOption}
          sortOptions={sortOptions}
        />
        <ProductFilter
          filters={baseFiltersOptions}
          handleFilter={handleFilter}
        />
      </div>

      <h1 className="list-title">Product List</h1>
      <div className="product-list-container">
        <div className="list">
          {!isEmpty(products) &&
            products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          {isEmpty(products) && (
            <div>
              There are no products yet or you submitted an incorrect request.
            </div>
          )}
        </div>
        <div className="list-paginator">
          {!isEmpty(products) && (
            <Pagination
              data={{ page, limit, count }}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
