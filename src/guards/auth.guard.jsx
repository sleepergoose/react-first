import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ component }) => {
  const authState = useSelector((store) => store?.auth);

  return authState?.isLoggedIn ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default AuthGuard;
