import { AgenciesContextProvider } from './agenciesContext';
import { EmployeeContextProvider } from './employeeContext';
import { UserProvider } from '../components/auth/UserContext';

function AllContextsProvider({ children }) {
  return (
    <UserProvider>
      <AgenciesContextProvider>
        <EmployeeContextProvider>{children}</EmployeeContextProvider>
      </AgenciesContextProvider>
    </UserProvider>
  );
}
export default AllContextsProvider;
