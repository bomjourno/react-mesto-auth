import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthorized }) {
  return isAuthorized ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
