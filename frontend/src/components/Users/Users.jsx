import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { getAllUsers } from '../../api/usersApi';
import { UsersTable } from './UsersTable';

export function Users() {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ['users'],
  });

  if (isError) {
    return <div className="error">{error.message}</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div><UsersTable data={data.data} refetch={refetch} /></div>
  );
}
