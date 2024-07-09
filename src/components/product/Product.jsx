import './Product.css';
import { noPhotoImageUrl } from '../../constants/environment.jsx';

const Product = ({ product }) => {
  return (
    <>
      {product && (
        <div className="product-card">
          <div className="photo-block">
            <img
              src={product?.photoUrl || noPhotoImageUrl}
              alt="Product Image"
            />
          </div>
          <div className="description-block">
            <h3 className="product-name">{product?.name}</h3>
            <p className="product-manufacturer">
              Manufacturer: <b>{product?.manufacturer}</b>
            </p>
            <p className="product-price">
              Price: <b>{product?.price}</b> UAH
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
