import React, { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute;