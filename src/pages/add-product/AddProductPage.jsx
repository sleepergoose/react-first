import './AddProductPage.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../services/product.service.jsx';

const AddProductPage = () => {
  const navigate = useNavigate();
  const productService = new ProductService();

  const { register, handleSubmit, getValues, formState } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const { errors, isSubmitting, isValid } = formState;

  const [requestState, setRequestState] = useState({
    isPending: false,
    error: null,
  });

  const onSubmit = async () => {
    setRequestState({
      isPending: true,
      error: null,
    });

    const values = getValues();
    console.log(values);

    try {
      const createdProduct = await productService.createProduct(values);

      setRequestState({
        isPending: false,
        error: null,
      });

      navigate('/');
    } catch (error) {
      setRequestState({
        isPending: false,
        error: error,
      });
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="list-title">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="height">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            {...register('name', {
              required: {
                value: true,
                message: 'This field is required',
              },
              minLength: 3,
              maxLength: 128,
            })}
          />
          {errors?.name?.type === 'required' && (
            <span role="alert">{errors.name.message}</span>
          )}
          {(errors?.name?.type === 'minLength' ||
            errors?.name?.type === 'maxLength') && (
            <span role="alert">
              Product name must be 3 to 128 characters long
            </span>
          )}
        </div>

        <div className="height">
          <label htmlFor="manufacturer" className="form-label">
            Manufacturer:
          </label>
          <input
            type="text"
            name="manufacturer"
            className="form-control"
            placeholder="Manufacturer Name"
            {...register('manufacturer', {
              required: {
                value: true,
                message: 'This field is required',
              },
              minLength: 3,
              maxLength: 64,
            })}
          />
          {errors?.manufacturer?.type === 'required' && (
            <span role="alert">{errors.manufacturer.message}</span>
          )}
          {(errors?.manufacturer?.type === 'minLength' ||
            errors?.manufacturer?.type === 'maxLength') && (
            <span role="alert">
              Manufacturer name must be 3 to 64 characters long
            </span>
          )}
        </div>

        <div className="height">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price, UAH"
            {...register('price', {
              required: {
                value: true,
                message: 'This field is required',
              },
              min: 0,
              max: 1000000,
              valueAsNumber: true,
            })}
          />
          {errors?.price?.type === 'required' && (
            <span role="alert">{errors.price.message}</span>
          )}
          {(errors?.price?.type === 'min' || errors?.price?.type === 'max') && (
            <span role="alert">
              The price should be from 0 to 1,000,000 UAH
            </span>
          )}
        </div>

        <div className="height">
          <label htmlFor="photoUrl" className="form-label">
            Photo URL:
          </label>
          <input
            type="url"
            name="photoUrl"
            className="form-control"
            placeholder="Upload photo here"
            {...register('photoUrl')}
          />
        </div>

        <div className="height textarea-control">
          <label htmlFor="shortDescription" className="form-label">
            Short Description:
          </label>
          <textarea
            type="text"
            name="shortDescription"
            className="form-control"
            placeholder="Add short description"
            {...register('shortDescription', {
              required: {
                value: true,
                message: 'This field is required',
              },
              minLength: 10,
              maxLength: 256,
            })}
          />
          {errors?.shortDescription?.type === 'required' && (
            <span role="alert">{errors.shortDescription.message}</span>
          )}
          {(errors?.shortDescription?.type === 'minLength' ||
            errors?.shortDescription?.type === 'maxLength') && (
            <span role="alert">
              Description must be 10 to 256 characters long
            </span>
          )}
        </div>

        {requestState.error && (
          <div className="error-message">
            <h4>An error occurred during registration flow.</h4>
            <p>{requestState.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="m-3 w-50 btn btn-primary"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
