import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // Token can be in localStorage or sessionStorage
  const token =
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken");

  // If not logged in → redirect to admin login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in → allow access
  return children;
}
