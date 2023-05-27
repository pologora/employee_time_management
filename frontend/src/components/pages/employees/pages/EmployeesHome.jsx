import { Box, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddEmployee from '../components/AddEmployeeModal';
import EmployeesTable from '../components/EmployeesTable';
import { getEmployees } from '../../../../api/employeesApi';

function EmployeesHome({ setSelectedEmployee, handleChangeComponentToRender }) {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = employees.filter(
      (employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        || employee.surname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  useEffect(() => {
    handleGetEmployees();
  }, []);

  return (
    <div>
      <Box sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            label="Wyszukaj po imieniu"
            variant="standard"
            margin="normal"
            value={searchTerm}
            sx={{ margin: 0 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddEmployee
            employees={employees}
            getEmployees={handleGetEmployees}
          />
        </Box>
        {!isLoading ? (
          <EmployeesTable
            employees={filteredEmployees}
            setSelectedEmployee={setSelectedEmployee}
            handleChangeComponentToRender={handleChangeComponentToRender}
            getEmployees={handleGetEmployees}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
export default EmployeesHome;
