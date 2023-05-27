import { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import EmployeesActiveTable from './EmployeesActiveTable';
import LogoutButton from '../../auth/LogoutButton';
import { getWorkingEmployees } from '../../../api/employeesApi';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleGetWorkingEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkingEmployees();
      setEmployees(data);
    } catch (error) {
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetWorkingEmployees();
  }, []);

  return (
    <div>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button variant="outlined" onClick={handleGetWorkingEmployees}>
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
