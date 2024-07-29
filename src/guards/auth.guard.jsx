import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    checkAuthState();
  });

  const checkAuthState = () => {
    const state = authService.getAuthState();

    if (!state) {
      setAuthState(false);
      navigate('/login');
      return;
    }

    setAuthState(true);
  };

  return authState ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AuthGuard;
