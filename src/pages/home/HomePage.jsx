import './HomePage.css';
import ProductList from '../../components/product-list/ProductList.jsx';
import { useEffect, useState, useCallback } from 'react';
import ProductService from '../../services/product.service.jsx';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [productsData, setProductsData] = useState(null);
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 5;

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
