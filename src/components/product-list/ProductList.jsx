import './ProductList.css';
import Product from '../product/Product.jsx';

const ProductList = ({ products }) => {
  return (
    <>
      <div className="home-container">
        {products?.length &&
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
      </div>
    </>
  );
};

export default ProductList;
