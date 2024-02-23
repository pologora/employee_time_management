import { CssBaseline } from '@mui/material';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/app"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
              )}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
