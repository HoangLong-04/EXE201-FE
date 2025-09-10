import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/user/homePage/HomePage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
