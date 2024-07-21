import './Product.css';
import { noPhotoImageUrl } from '../../../../constants/environment.js';

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
            <span className="product-description">
              {product?.shortDescription}
            </span>
          </div>
          <div className="controls-block">
            <p className="product-price">
              <b>{product?.price}</b> UAH
            </p>
            <button type="button" className="btn btn-primary">
              See details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
