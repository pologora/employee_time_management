import { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

import EmployeesActiveTable from './EmployeesActiveTable';
import useAxios from '../../../hooks/useAxios';
import baseUrl from '../../../options/baseUrl';

function Home() {
  const [employees, setEmployees] = useState([]);
  const { error, get, isLoading } = useAxios();

  const getEmployees = async () => {
    const url = `${baseUrl}/employees/isWorking`;
    const data = await get(url);
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={getEmployees}>
        Odśwież
      </Button>
      <Box sx={{ marginTop: 5 }}>
        {!isLoading && !error ? (
          <EmployeesActiveTable employees={employees} />
        ) : (
          <div>
            {error ? (
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
