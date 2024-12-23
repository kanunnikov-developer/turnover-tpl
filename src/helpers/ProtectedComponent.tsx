import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedComponent  = ({children}: {children: ReactNode}) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
}