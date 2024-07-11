import './HomePage.css';
import ProductList from '../../components/product-list/ProductList.jsx';
import { useEffect, useState, useCallback } from 'react';
import ProductService from '../../services/product.service.jsx';
import useQueryParams from '../../hooks/use-query-params.jsx';

const HomePage = () => {
  const [productsData, setProductsData] = useState(null);
  const { getNumericQueryParams } = useQueryParams();

  const [page, limit] = getNumericQueryParams(
    {
      name: 'page',
      lowLimit: 1,
      upperLimit: 100
    },
    {
      name: 'limit',
      lowLimit: 5,
      upperLimit: 20
    },
  );

  const fetchProducts = useCallback(async () => {
    const productService = new ProductService();
    const data = await productService.getPaginatedProducts(page, limit);
    setProductsData(data);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <div className="home-container">
        {productsData && (
          <ProductList productsData={productsData} page={page} limit={limit} />
        )}
      </div>
    </>
  );
};

export default HomePage;
