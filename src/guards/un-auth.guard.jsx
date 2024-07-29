import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnAuthGuard = ({ component }) => {
  const authState = useSelector((store) => store?.auth?.auth);

  return authState?.isLoggedIn ? (
    <Navigate to={'/'} />
  ) : (
    <React.Fragment>{component}</React.Fragment>
  );
};

export default UnAuthGuard;
