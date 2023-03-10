import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import EmployeeActiveList from './EmployeeActiveList';
import baseUrl from '../../../options/baseUrl';

const endPoint = '/employees/isWorking';

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${baseUrl}${endPoint}`,
  headers: {},
};

function Home() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const { data } = await axios(config);
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const employeesSortedByTime = [...employees].sort(
    (a, b) => new Date(a.startWorkingTime).getTime() - new Date(b.startWorkingTime).getTime(),
  );

  return (
    <div>
      <Button variant="outlined" onClick={getEmployees}>
        Odśwież
      </Button>
      {employees.length > 0 ? (
        <EmployeeActiveList employees={employeesSortedByTime} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
export default Home;
