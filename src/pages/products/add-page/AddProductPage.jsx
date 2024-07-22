import './AddProductPage.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useFetchData } from '../../../hooks/use-fetch-data.jsx';
import FormInput from '../../../components/form/FormInput.jsx';
import FormSelect from '../../../components/form/FormSelect.jsx';
import productService from '../../../services/product.service.js';

const AddProductPage = () => {
  const horizontal = 'left';
  const vertical = 'bottom';

  const [types] = useFetchData('/products/types');

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleOpenSnackbarClick = (message, severity = 'success') => {
    setOpenSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const handleSnackbarClick = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async () => {
    const values = getValues();

    try {
      await productService.createProduct(values);

      handleOpenSnackbarClick('New product is added successfully!');

      reset({
        name: '',
        manufacturer: '',
        price: 0,
        photoUrl: '',
        shortDescription: '',
      });
    } catch (error) {
      handleOpenSnackbarClick(
        'Something went wrong while a new product has been adding!',
        'error'
      );
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="list-title">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Product Name"
          name="name"
          variant="standard"
          type="text"
          errors={errors}
          register={register('name', {
            required: {
              value: true,
            },
            minLength: {
              value: 3,
              message: '\'Product Name\' must be more than 3 characters long',
            },
            maxLength: {
              value: 128,
              message: '\'Product Name\' must be less than 128 characters long',
            },
          })}
        />

        <FormInput
          label="Manufacturer Name"
          name="manufacturer"
          variant="standard"
          type="text"
          errors={errors}
          register={register('manufacturer', {
            required: {
              value: true,
            },
            minLength: {
              value: 3,
              message:
                '\'Manufacturer Name\' must be more than 3 characters long',
            },
            maxLength: {
              value: 64,
              message:
                '\'Manufacturer Name\' must be less than 64 characters long',
            },
          })}
        />

        <div className="grouped-controls">
          <FormInput
            label="Price, UAH"
            name="price"
            variant="standard"
            type="number"
            errors={errors}
            register={register('price', {
              required: {
                value: true,
              },
              min: {
                value: 0,
                message: '\'Price\' must be more than 0',
              },
              max: {
                value: 1000000,
                message: '\'Price\' must be less than 1000000',
              },
              valueAsNumber: true,
            })}
          />

          <FormSelect
            name="type"
            label="Product Type"
            errors={errors}
            variant="standard"
            options={types}
            register={register('type', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
          />
        </div>

        <FormInput
          label="Photo URL"
          name="photoUrl"
          variant="standard"
          type="url"
          errors={errors}
          register={register('photoUrl')}
        />

        <FormInput
          label="Product short description"
          name="shortDescription"
          variant="standard"
          type="text"
          multiline={4}
          errors={errors}
          register={register('shortDescription', {
            required: {
              value: true,
            },
            minLength: {
              value: 10,
              message:
                '\'Product short description\' must be more than 10 characters long',
            },
            maxLength: {
              value: 256,
              message:
                '\'Product short description\' must be less than 256 characters long',
            },
          })}
        />

        {!isSubmitting && (
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="m-3 w-50 btn btn-primary"
          >
            Add Product
          </button>
        )}

        {isSubmitting && (
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="m-3 w-50 btn btn-primary"
          >
            Product adding...
          </button>
        )}
      </form>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar.open}
        onClose={handleSnackbarClick}
        key={vertical + horizontal}
        autoHideDuration={5000}
      >
        <Alert
          onClose={handleSnackbarClick}
          severity={openSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductPage;
