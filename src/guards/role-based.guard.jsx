import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleBasedGuard = ({ component, requiredRole }) => {
  const authState = useSelector((store) => store?.auth);

  return authState?.isLoggedIn && authState?.user?.role === requiredRole ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <Navigate to={'/'} />
  );
};

export default RoleBasedGuard;
