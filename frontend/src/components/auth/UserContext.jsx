import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getSafeContext } from '../../contexts/getSafeContext';

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cookieUser = Cookies.get('user');
    return cookieUser ? JSON.parse(cookieUser) : null;
  });
  const navigate = useNavigate();

  const navigateToLogin = () => navigate('/login');

  const signIn = (user) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
    navigateToLogin();
  };

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 365 });
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ user, signIn, signOut }}>{children}</UserContext.Provider>;
}

export const useUserContext = getSafeContext(UserContext, 'UserContext');
