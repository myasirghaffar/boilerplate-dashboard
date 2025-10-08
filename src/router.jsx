import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./global/AppLayout";
import Login from "./pages/Login";
import UnauthorizedPage from "./pages/Unauthor";
import AuthGuard from "./components/AuthGuard";
import AuthRedirect from "./utils/AuthRedirect";

// Dashboard imports
import AdminDashboard from "./pages/adminRole/dashboard";
import UserDashboard from "./pages/userRole/dashboard";
import ContractorDashboard from "./pages/contractorRole/dashboard";

const AppRouter = () => {
  return (
    <Routes>
      {/* Root route - redirect based on authentication */}
      <Route path="/" element={<AuthRedirect />} />

      {/* Authentication Routes - No Layout (Full Page) */}
      <Route path="/login" element={<Login />} />

      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Admin Dashboard Routes - Using AppLayout */}
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* User Dashboard Routes - Using AppLayout */}
      <Route
        path="/user"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* Contractor Dashboard Routes - Using AppLayout */}
      <Route
        path="/contractor"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<ContractorDashboard />} />
        <Route path="dashboard" element={<ContractorDashboard />} />
      </Route>

      {/* Catch all route for 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-800">
              <h1 className="text-4xl font-poppins font-bold mb-4">404</h1>
              <p className="text-xl font-poppins">Page not found</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRouter;
