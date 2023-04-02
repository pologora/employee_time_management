import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function LogoutButton() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
}

export default LogoutButton;
