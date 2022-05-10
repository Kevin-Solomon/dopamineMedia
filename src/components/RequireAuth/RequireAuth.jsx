import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
function RequireAuth({ children }) {
  const { token } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  console.log(pathname);
  return token === '' ? (
    <Navigate to="/auth" state={{ prevPath: pathname }} />
  ) : (
    children
  );
}

export default RequireAuth;
