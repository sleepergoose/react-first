import './ProductList.css';
import Product from '../product/Product.jsx';
import Pagination from '../../../../components/pagination/Pagination.jsx';
import { isEmpty } from 'lodash';

const ProductList = ({ productsData, page, limit }) => {
  const { count, products } = productsData;

  return (
    <>
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
          {products?.length > 0 && <Pagination data={{ page, limit, count }} />}
        </div>
      </div>
    </>
  );
};

export default ProductList;
