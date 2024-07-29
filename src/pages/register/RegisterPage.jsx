import './RegisterPage.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service.js';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [requestState, setRequestState] = useState({
    isPending: false,
    error: null,
  });

  const { register, handleSubmit, getValues, formState } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async () => {
    setRequestState({
      isPending: true,
      error: null,
    });

    const { name, email, password } = getValues();

    try {
      if (name && email && password) {
        await authService.signUp({
          name: name,
          email: email,
          password: password,
        });

        setRequestState({
          isPending: false,
          error: null,
        });

        navigate('/');
      }
    } catch (error) {
      setRequestState({
        isPending: false,
        error: error,
      });
    }
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 d-flex flex-column align-items-center shadow col-11 col-lg-6 col-xxl-4"
          style={{
            border: '1px solid #48484830',
            borderRadius: '10px',
            margin: '25px auto',
          }}
        >
          <h3>Register Form</h3>

          <div className="m-3 w-100 mb-0 form-control-height">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 32,
              })}
            />
            {errors?.name?.type === 'required' && (
              <span role="alert">Name is required</span>
            )}
            {(errors?.name?.type === 'minLength' ||
              errors?.name?.type === 'maxLength') && (
              <span role="alert">Name must be 3 to 32 characters long</span>
            )}
          </div>

          <div className="m-3 w-100 mb-0 form-control-height">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control "
              placeholder="Email Address"
              {...register('email', {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              })}
            />
            {errors?.email?.type === 'required' && (
              <span role="alert">Email is required</span>
            )}
            {errors?.email?.type === 'pattern' && (
              <span role="alert">Entered email has incorrect format</span>
            )}
          </div>

          <div className="m-3 w-100 mb-0 form-control-height">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 20,
                pattern: /^[a-zA-Z0-9!@#$%^&*+-]{8,20}$/,
              })}
            />
            {errors?.password?.type === 'required' && (
              <span role="alert">Password is required</span>
            )}
            {(errors?.password?.type === 'minLength' ||
              errors?.password?.type === 'maxLength') && (
              <span role="alert">Password must be 8 to 32 characters long</span>
            )}
            {errors?.password?.type === 'pattern' && (
              <span role="alert">
                Password may include only letters, digits and symbols !@#$%^&*+-
              </span>
            )}
          </div>

          {requestState.isPending && (
            <button type="submit" disabled className="m-3 w-50 btn btn-primary">
              Registration...
            </button>
          )}
          {!requestState.isPending && (
            <button
              type="submit"
              className="m-3 w-50 btn btn-primary"
              disabled={!isValid || isSubmitting}
            >
              Register
            </button>
          )}

          {requestState.error && (
            <div className="error-message">
              <h4>An error occurred during registration flow.</h4>
              <p>{requestState.error}</p>
            </div>
          )}

          <div className="go-to-login">
            <Link to={'/login'} className="login-btn">
              Already have account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
