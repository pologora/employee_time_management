import { useContext, createContext, useState } from 'react';
import { getEmployees } from '../api/employeesApi';

const EmployeesContext = createContext();

export function EmployeeContextProvider({ children }) {
  const [employees, setEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setIsError(false);
      setError('');
    } catch (error) {
      setIsError(true);
      setError(error.message ?? 'Coś poszło nie tak');
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    fetchEmployees();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    employees, isLoading, fetchEmployees, isError, error,
  };
  return (
    <EmployeesContext.Provider value={contextValue}>
      {children}
    </EmployeesContext.Provider>
  );
}

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error(
      'useEmployeesContext must be used inside the EmployeesProvider',
    );
  }

  return context;
};
