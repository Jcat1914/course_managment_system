import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../models/routes.js'
import { getLocalStorage } from '../helpers/localStorage.js'
import React from 'react';


export function RoleGuard({ role }) {
  const user = getLocalStorage('user');
  console.log(role)
  return user && user.role === role ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.REGISTRAR} />
  );
};
