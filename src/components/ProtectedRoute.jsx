import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;