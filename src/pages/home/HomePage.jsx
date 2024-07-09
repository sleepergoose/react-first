import './HomePage.css';
import ProductList from '../../components/product-list/ProductList.jsx';
import { useEffect, useState, useCallback } from 'react';
import ProductService from '../../services/product.service.jsx';

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchProducts = useCallback(async () => {
    const productService = new ProductService();
    const data = await productService.getPaginatedProducts(page, limit);
    setProducts(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default HomePage;
