import { CssBaseline } from '@mui/material';
import {
  Route,
  Routes,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/home/Home';
import Employees from './components/pages/employees/Employees';
import Raporty from './components/pages/raports/Raports';
import AgencjaHome from './components/pages/agencja/AgencjaHome';
import Vacations from './components/pages/vacations/Vacations';
import { NotFound } from './components/NotFound/NotFound';
import { ProposalsRoutes } from './components/Proposals/ProposalsRoutes';
import { UsersRoutes } from './components/Users/UsersRoutes';
import { NotificationAlert } from './components/NotificationAlert/NotificationAlert';

function App() {
  return (
    <>
      <CssBaseline />
      <NotificationAlert />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
              )}
        >
          <Route element={<Home />} path="/home" />
          <Route element={<Employees />} path="/employees" />
          <Route element={<Vacations />} path="/vacations" />
          <Route element={<Raporty />} path="/raports" />
          <Route element={<AgencjaHome />} path="/agencies" />
          <Route element={<Raporty />} path="/raports" />

          <Route element={<ProposalsRoutes />} path="/proposals/*" />

          <Route element={<UsersRoutes />} path="/users/*" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
