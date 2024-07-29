import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const UnAuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    checkAuthState();
  });

  const checkAuthState = () => {
    const state = authService.getAuthState();

    if (state) {
      setAuthState(true);
      navigate('/');
      return;
    }

    setAuthState(false);
  };

  return authState ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{component}</React.Fragment>
  );
};

export default UnAuthGuard;
