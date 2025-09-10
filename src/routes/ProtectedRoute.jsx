import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  if (user === undefined) return <div>Loading...</div>;

  // if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;
  return children;
}
