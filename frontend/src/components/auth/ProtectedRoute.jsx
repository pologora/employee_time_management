import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;
