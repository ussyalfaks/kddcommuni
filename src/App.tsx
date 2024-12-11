import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { queryClient } from './lib/queryClient'; // Import your queryClient
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
          {/* Public Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />

          {/* Private Routes */}
          <Route
            path="/admin/*" // Handles nested routes
            element={
              <PrivateRoute> {/* Only render AdminLayout if the user is authenticated */}
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Nested Route for the dashboard */}
            <Route index element={<DashboardPage />} />
            {/* Add more routes under AdminLayout here */}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
