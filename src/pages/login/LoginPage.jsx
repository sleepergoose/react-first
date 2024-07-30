import './LoginPage.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../store/slices/auth.slice.js';

const LoginPage = () => {
  const authState = useSelector((store) => store?.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues, formState } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async () => {
    const { email, password } = getValues();

    dispatch(
      loginRequestAction({
        email: email,
        password: password,
      })
    );
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 d-flex flex-column align-items-center shadow col-11 col-lg-6 col-xxl-4"
          style={{
            border: '1px solid #48484830',
            borderRadius: '10px',
            margin: '25px auto',
          }}
        >
          <h3>Login Form</h3>

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
              errors.password?.type === 'maxLength') && (
              <span role="alert">Password must be 8 to 20 characters long</span>
            )}
            {errors?.password?.type === 'pattern' && (
              <span role="alert">
                Password may include only letters, digits and symbols !@#$%^&*+-
              </span>
            )}
          </div>

          {authState?.isLoading && (
            <button type="submit" disabled className="m-3 w-50 btn btn-primary">
              Signing in...
            </button>
          )}
          {!authState?.isLoading && (
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="m-3 w-50 btn btn-primary"
            >
              Sign In
            </button>
          )}

          {authState?.error && (
            <div className="error-message">
              <p>An error occurred during signing in flow.</p>
              <p>{authState?.error}</p>
            </div>
          )}

          <div className="no-account">
            <Link to={'/register'} className="create-account-btn">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
