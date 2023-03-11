import { Box, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';

import AddEmployee from './AddEmployeeModal';
import EmployeesTable from './EmployeesTable';
import UpdateEmployee from './UpdateEmployeeModal';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { get, isLoading } = useAxios();

  const getEmployees = async () => {
    const url = 'https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employees';
    const data = await get(url);
    setEmployees(data);
    setFilteredEmployees(data);
  };

  useEffect(() => {
    const filtered = employees.filter(
      (employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        || employee.surname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField
            label="Wyszukaj po imieniu"
            variant="standard"
            margin="normal"
            value={searchTerm}
            sx={{ margin: 0 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddEmployee employees={employees} getEmployees={getEmployees} />
          <UpdateEmployee />
        </Box>
        {!isLoading ? <EmployeesTable employees={filteredEmployees} /> : <CircularProgress />}
      </Box>
    </div>
  );
}
export default Employees;
