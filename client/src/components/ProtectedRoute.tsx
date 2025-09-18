import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to={'/signin'} replace />;
    }

    return <Outlet/>
}

export default ProtectedRoute;