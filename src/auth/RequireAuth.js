import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import useAuth from '../hooks/useAuth';

const RequireAuth = (
    // { allowedRoles }
    ) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;