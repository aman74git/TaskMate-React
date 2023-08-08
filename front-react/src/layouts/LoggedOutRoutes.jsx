import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';

const LoggedOutRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.token ? (
    <Navigate to='/home' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default LoggedOutRoutes;
