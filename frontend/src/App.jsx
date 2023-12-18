import { CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AllContextsProvider from './contexts/AllContextsProvider';

function App() {
  return (
    <>
      <CssBaseline />
      <AllContextsProvider>
        <Router>
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
        </Router>
      </AllContextsProvider>
    </>
  );
}

export default App;
