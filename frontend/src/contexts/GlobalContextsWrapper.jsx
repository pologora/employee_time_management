import { BrowserRouter } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AgenciesContextProvider } from './agenciesContext';
import { EmployeeContextProvider } from './employeeContext';
import { UserContextProvider } from '../components/auth/UserContext';
import NotificationContextProvider from './notificationContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60000,
    },
  },
  queryCache: new QueryCache(),
});

function GlobalContextsWrapper({ children }) {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AgenciesContextProvider>
          <NotificationContextProvider>
            <QueryClientProvider client={queryClient}>
              <EmployeeContextProvider>{children}</EmployeeContextProvider>
            </QueryClientProvider>
          </NotificationContextProvider>
        </AgenciesContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}
export default GlobalContextsWrapper;
