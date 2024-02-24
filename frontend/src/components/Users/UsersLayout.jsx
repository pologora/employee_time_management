import { Outlet } from 'react-router-dom';
import './Users.css';

export function UsersLayout() {
  return (
    <div className="usersLayoutContainer"><Outlet /></div>
  );
}
