import './HomePage.css';
import { useEffect, useState, useCallback } from 'react';
import useQueryParams from '../../hooks/use-query-params.jsx';
import ProductService from '../../services/product.service.jsx';
import ProductList from '../../components/product-list/ProductList.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';

const HomePage = () => {
  const [productsData, setProductsData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const { getNumericQueryParams } = useQueryParams();

  const [page, limit] = getNumericQueryParams(
    {
      name: 'page',
      lowLimit: 1,
      upperLimit: 100,
    },
    {
      name: 'limit',
      lowLimit: 5,
      upperLimit: 20,
    }
  );

  const fetchProducts = useCallback(async () => {
    setIsPending(true);
    const productService = new ProductService();
    const data = await productService.getPaginatedProducts(page, limit);
    setProductsData(data);
    setIsPending(false);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-43px',
    marginLeft: '43px',
  };

  return (
    <>
      <div className="home-container">
        {isPending && (
          <div className="spinner">
            <Spinner style={spinnerStyle} />
          </div>
        )}
        {!isPending && productsData && (
          <ProductList productsData={productsData} page={page} limit={limit} />
        )}
      </div>
    </>
  );
};

export default HomePage;
