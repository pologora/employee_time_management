import { Button, CircularProgress, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import EmployeesActiveTable from './EmployeesActiveTable';
import LogoutButton from '../../auth/LogoutButton';
import { getWorkingEmployees } from '../../../api/employeesApi';

function Home() {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryFn: () => getWorkingEmployees(),
    queryKey: ['isWorking'],
  });

  return (
    <div>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button variant="outlined" onClick={refetch}>
          Odśwież
        </Button>
        <LogoutButton />
      </Box>
      <Box sx={{ marginTop: 5 }}>
        {!isLoading && !isError ? (
          <EmployeesActiveTable employees={data.data} />
        ) : (
          <div>
            {isError ? (
              <p>
                {error}
              </p>
            ) : (
              <CircularProgress />
            )}
          </div>
        )}
      </Box>
    </div>
  );
}
export default Home;
