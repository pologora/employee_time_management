import { BrowserRouter } from 'react-router-dom';
import { AgenciesContextProvider } from './agenciesContext';
import { EmployeeContextProvider } from './employeeContext';
import { UserContextProvider } from '../components/auth/UserContext';

function GlobalContextsWrapper({ children }) {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AgenciesContextProvider>
          <EmployeeContextProvider>{children}</EmployeeContextProvider>
        </AgenciesContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}
export default GlobalContextsWrapper;
