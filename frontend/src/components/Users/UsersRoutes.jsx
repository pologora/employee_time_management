import { Route, Routes } from 'react-router-dom';
import { Users } from './Users';
import { UserDetail } from './UserDetail';
import { UsersLayout } from './UsersLayout';

export function UsersRoutes() {
  return (
    <Routes>
      <Route element={<UsersLayout />}>
        <Route index element={<Users />} />
        <Route element={<UserDetail />} path=":id" />
      </Route>
    </Routes>
  );
}
