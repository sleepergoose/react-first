import './HomePage.css';
import { useFetchData } from '../../hooks/use-fetch-data.jsx';
import Product from '../products/list-page/components/product/Product.jsx';
import { isArray } from 'lodash';

const HomePage = () => {
  const [products, isDataPending] = useFetchData('/products/recent/3');

  return (
    <div className="home-container">
      <h1 className="list-title">Recently added products</h1>
      <div className="recent-products">
        {!isDataPending &&
          isArray(products) &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
