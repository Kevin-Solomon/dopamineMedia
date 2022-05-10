import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
function RequireAuth({ children }) {
  const { token } = useSelector(state => state.auth);
  const location = useLocation();
  console.log(location);
  return token === '' ? (
    <Navigate to="/auth" state={{ prevPath: location?.pathname }} />
  ) : (
    children
  );
}

export default RequireAuth;
