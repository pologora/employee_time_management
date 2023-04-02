import { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

import EmployeesActiveTable from './EmployeesActiveTable';
import useAxios from '../../../hooks/useAxios';
import baseUrl from '../../../options/baseUrl';
import LogoutButton from '../../auth/LogoutButton';
import { useUser } from '../../auth/UserContext';

function Home() {
  const [employees, setEmployees] = useState([]);
  const { error, get, isLoading } = useAxios();
  const { user } = useUser();
  const [err, setErr] = useState(error);
  console.log(user);

  const getEmployees = async () => {
    if (user) {
      const url = `${baseUrl}/employees/isWorking`;
      const data = await get(url);
      setEmployees(data);
    } else {
      setErr('User not logged in');
    }
  };

  useEffect(() => {
    if (user) {
      getEmployees();
    }
  }, [user]);

  return (
    <div>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button variant="outlined" onClick={getEmployees}>
          Odśwież
        </Button>
        <LogoutButton />
      </Box>
      <Box sx={{ marginTop: 5 }}>
        {!isLoading && !err ? (
          <EmployeesActiveTable employees={employees} />
        ) : (
          <div>
            {err ? (
              <p>
                Wystąpił błąd podczas pobierania danych. Spróbuj ponownie
                później.
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
