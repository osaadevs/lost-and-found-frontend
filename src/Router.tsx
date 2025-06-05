import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import UserDashboard from './pages/UserDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportLostItem from './pages/ReportLostItem';
import LostItemsList from './pages/LostItemsList';
import ReportFoundItem from './pages/ReportFoundItem';
import FoundItemsList from './pages/FoundItemsList';
import FoundItemsForUser from './pages/FoundItemsForUser';
import UserClaimList from './pages/UserClaimList';

import ClaimListForStaff from './pages/ClaimListForStaff';

import AdminItemList from './pages/AdminItemList';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminRequestManagement from './pages/AdminRequestManagement';


import ProtectedRoute from './components/ProtectedRoute';


const AppRouter: React.FC = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute requiredRole="USER">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/report"
            element={
              <ProtectedRoute requiredRole="USER">
                <ReportLostItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/lost"
            element={
              <ProtectedRoute requiredRole="USER">
                <LostItemsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/found"
            element={
              <ProtectedRoute requiredRole="USER">
                <FoundItemsForUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/claims"
            element={
              <ProtectedRoute requiredRole="USER">
                <UserClaimList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff/dashboard"
            element={
              <ProtectedRoute requiredRole="STAFF">
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/staff/found"
            element={
              <ProtectedRoute requiredRole="STAFF">
                <FoundItemsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff/report"
            element={
              <ProtectedRoute requiredRole="STAFF">
                <ReportFoundItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff/claims"
            element={
              <ProtectedRoute requiredRole="STAFF">
                <ClaimListForStaff />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/items"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminItemList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminUserManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminRequestManagement />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
  );
};

export default AppRouter;
