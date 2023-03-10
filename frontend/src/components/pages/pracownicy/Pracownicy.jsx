import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import baseUrl from '../../../options/baseUrl';
import EmployeeList from './EmployeeList';

const endPoint = '/employees';

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${baseUrl}${endPoint}`,
  headers: {},
};

function Pracownicy() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const { data } = await axios(config);
      setEmployees(data);
      console.log(data);
      console.log(employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Typography>Dupa</Typography>
      {employees.length > 0 ? <EmployeeList employees={employees} /> : <CircularProgress />}
    </div>
  );
}
export default Pracownicy;
