import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

function LogoutButton() {
  const { signOut } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut();
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Wyloguj</Button>;
}

export default LogoutButton;
