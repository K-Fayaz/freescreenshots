import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAuthenticated: boolean;
    next?: string;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated,next }) => {
    if (!isAuthenticated) {
        return <Navigate to={`/signin${next ? `?redirect=${next}`:''}`} replace />;
    }

    return <Outlet/>
}

export default ProtectedRoute;