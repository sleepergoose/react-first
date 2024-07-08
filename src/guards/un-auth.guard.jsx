import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const UnAuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    checkAuthState();
  }, [component]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthState = () => {
    const state = authService.getAuthState();

    if (state) {
      setAuthState(true);
      navigate('/');
      return;
    }

    setAuthState(false);
  };

  return (
    authState ? <React.Fragment></React.Fragment> : <React.Fragment>{component}</React.Fragment>
  );
};

export default UnAuthGuard;