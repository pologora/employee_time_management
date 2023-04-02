import {
  createContext, useState, useContext, useMemo, useEffect,
} from 'react';
import app from '../../options/realmConfig';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = () => {
      const { currentUser } = app;
      setUser(currentUser);
      setLoading(false);
    };

    restoreUser();
  }, []);

  const value = useMemo(() => ({ user, setUser, loading }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
