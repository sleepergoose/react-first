import './AddProductPage.css';
import { useForm } from 'react-hook-form';

const AddProductPage = () => {
  const { register, handleSubmit, getValues, formState } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async () => {
    const values = getValues();
    console.log(values);
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

        {/* <div className="add-tech-field">
          <img src="src/assets/plus-circle.svg" alt="add field" />
          <span>Add Tech Field</span>
        </div> */}

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
