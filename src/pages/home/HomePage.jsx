import './HomePage.css';
import { useEffect, useState, useCallback } from 'react';
import useQueryParams from '../../hooks/use-query-params.jsx';
import productService from '../../services/product.service.js';
import ProductList from './components/product-list/ProductList.jsx';
import Spinner from '../../components/spinner/Spinner.jsx';
import { sortOptions } from './components/filter/models/sort-options.js';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [productsData, setProductsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const navigate = useNavigate();

  const { getQueryParams } = useQueryParams();

  const [page, limit, sortOption, type, manufacturer] = getQueryParams(
    {
      name: 'page',
      type: 'numeric',
      lowLimit: 1,
      upperLimit: 100,
    },
    {
      name: 'limit',
      type: 'numeric',
      lowLimit: 5,
      upperLimit: 20,
    },
    {
      name: 'sortOption',
      type: 'text',
      validValues: [...sortOptions.map((o) => o.value)],
    },
    {
      name: 'type',
      type: 'array',
    },
    {
      name: 'manufacturer',
      type: 'array',
    }
  );

  const fetchProducts = useCallback(async () => {
    setIsPending(true);
    const data = await productService.getPaginatedProducts(
      page,
      limit,
      sortOption
    );
    setProductsData(data);
    setIsPending(false);
  }, [page, limit, sortOption]);

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

  const handleProductListEvents = (clickedPage, sortOption) => {
    navigate(`/?page=${clickedPage}&limit=${limit}&sortOption=${sortOption}`);
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
          <ProductList
            productsData={productsData}
            page={page}
            limit={limit}
            sortOption={sortOption}
            handleEvents={handleProductListEvents}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
