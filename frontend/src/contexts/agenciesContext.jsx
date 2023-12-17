import { useContext, createContext, useState } from 'react';
import { getAgencies } from '../api/agenciesApi';

const AgenciesContext = createContext();

export function AgenciesContextProvider({ children }) {
  const [agencies, setAgencies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAgencies = async () => {
    setIsLoading(true);
    const data = await getAgencies();
    setAgencies(data);
    setIsLoading(false);
  };

  useState(() => {
    fetchAgencies();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = { agencies, isLoading, fetchAgencies };
  return (
    <AgenciesContext.Provider value={contextValue}>
      {children}
    </AgenciesContext.Provider>
  );
}

export const useAgenciesContext = () => {
  const context = useContext(AgenciesContext);
  if (!context) {
    throw new Error('useAgencyContext must be used inside the AgencyProvider');
  }

  return context;
};
