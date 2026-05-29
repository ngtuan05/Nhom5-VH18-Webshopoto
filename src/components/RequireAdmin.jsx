import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function RequireAdmin({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAdmin;
