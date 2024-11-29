import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './components/admin/auth/LoginPage';
import { RegisterPage } from './components/admin/auth/RegisterPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { PrivateRoute } from './components/admin/routes/PrivateRoute';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;