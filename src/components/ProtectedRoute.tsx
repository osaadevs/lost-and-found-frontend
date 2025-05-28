import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../utils/jwtUtils';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = decodeToken(token);
    const role = decoded?.role;

    if (role !== requiredRole) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
