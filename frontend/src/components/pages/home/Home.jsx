import { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

import EmployeesActiveTable from './EmployeesActiveTable';
import useAxios from '../../../hooks/useAxios';

function Home() {
  const [employees, setEmployees] = useState([]);
  const { error, get, isLoading } = useAxios();

  const getEmployees = async () => {
    const url = 'https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employees/isWorking';
    const data = await get(url);
    setEmployees(data);
    if (error) {
      alert(error.message);
    }
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
              <p>Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później.</p>
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
