import { CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/Dashboard';
import { UserProvider } from './components/auth/UserContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AgenciesContextProvider } from './contexts/agenciesContext';

function App() {
  return (
    <>
      <CssBaseline />
      <UserProvider>
        <AgenciesContextProvider>
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
        </AgenciesContextProvider>
      </UserProvider>
    </>
  );
}

export default App;
