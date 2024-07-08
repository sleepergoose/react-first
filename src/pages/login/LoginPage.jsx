import { useState } from 'react';
import AuthService from '../../services/auth.service.jsx';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const authService = new AuthService();
  const navigate = useNavigate();

  const [requestState, setRequestState] = useState({
    isPending: false,
    error: null,
  });

  const [form, setForm] = useState({
    email: { value: '' },
    password: { value: '' },
  });

  const handleChange = (e) => {
    const _form = { ...form };
    _form[e.target.name].value = e.target.value;
    setForm(_form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRequestState({
      isPending: true,
      error: null,
    });

    try {
      if (form && form.email.value && form.password.value) {
        await authService.signIn({
          email: form.email.value,
          password: form.password.value,
        });

        setRequestState({
          isPending: false,
          error: null,
        });

        setForm({
          email: { value: '' },
          password: { value: '' },
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

  const handleCreateAccountClick = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="p-3 d-flex flex-column align-items-center shadow col-11 col-lg-6 col-xxl-4"
          style={{
            border: '1px solid #48484830',
            borderRadius: '10px',
            margin: '25px auto',
          }}
        >
          <h3>Login Form</h3>

          <div className="m-3 w-100">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control "
              placeholder="Email Address"
              value={form.email.value}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="m-3 w-100">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password.value}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {requestState.isPending && (
            <button type="submit" disabled className="m-3 w-50 btn btn-primary">
              Signing in...
            </button>
          )}
          {!requestState.isPending && (
            <button type="submit" className="m-3 w-50 btn btn-primary">
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
            <button type="button" className="create-account-btn" onClick={handleCreateAccountClick}>Create account</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
