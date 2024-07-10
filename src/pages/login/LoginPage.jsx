import { useState } from 'react';
import AuthService from '../../services/auth.service.jsx';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const authService = new AuthService();
  const navigate = useNavigate();

  const [requestState, setRequestState] = useState({
    isPending: false,
    error: null,
  });

  const { register, handleSubmit, getValues, setValue, trigger, formState } =
    useForm();
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async () => {
    setRequestState({
      isPending: true,
      error: null,
    });

    const { email, password } = getValues();

    try {
      if (email && password) {
        await authService.signIn({
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

  const onBlur = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
    trigger(name, { shouldFocus: false });
  };

  const handleCreateAccountClick = () => {
    navigate('/register');
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
          <h3>Login Form</h3>

          <div
            className="m-3 w-100 mb-0"
            style={{
              height: '94px',
            }}
          >
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control "
              placeholder="Email Address"
              {...register('email', {
                onBlur: (e) => onBlur(e),
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              })}
            />
            {errors.email?.type === 'required' && (
              <span role="alert">Email is required</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span role="alert">Entered email has incorrect format</span>
            )}
          </div>

          <div
            className="m-3 w-100 mb-0"
            style={{
              height: '94px',
            }}
          >
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              {...register('password', {
                onBlur: (e) => onBlur(e),
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
            {errors.password?.type === 'required' && (
              <span role="alert">Password is required</span>
            )}
            {(errors.password?.type === 'minLength' ||
              errors.password?.type === 'maxLength') && (
              <span role="alert">Password must be 8 to 20 characters long</span>
            )}
          </div>

          {requestState.isPending && (
            <button type="submit" disabled className="m-3 w-50 btn btn-primary">
              Signing in...
            </button>
          )}
          {!requestState.isPending && (
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="m-3 w-50 btn btn-primary"
            >
              Sign In
            </button>
          )}

          {requestState.error && (
            <div className="error-message">
              <h4>An error occurred during signing in flow.</h4>
              <p>{requestState.error}</p>
            </div>
          )}

          <div className="no-account">
            <button
              type="button"
              className="create-account-btn"
              onClick={handleCreateAccountClick}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
