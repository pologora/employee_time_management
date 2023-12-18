import {
  Autocomplete, Box, CircularProgress, TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddEmployee from '../components/AddEmployeeModal';
import EmployeesTable from '../components/EmployeesTable';
import { useEmployeesContext } from '../../../../contexts/employeeContext';
import { useAgenciesContext } from '../../../../contexts/agenciesContext';

function EmployeesHome({ setSelectedEmployee, handleChangeComponentToRender }) {
  const { employees, isLoading } = useEmployeesContext();
  const { agencies } = useAgenciesContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [agency, setAgency] = useState(null);

  useEffect(() => {
    let filtered = employees.filter(
      (employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        || employee.surname.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (agency) {
      filtered = filtered.filter((employee) => employee.agency === agency._id);
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, employees, agency]);

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
          <Autocomplete
            disablePortal
            style={{ width: '200px' }}
            id="agencja"
            name="agency"
            options={agencies}
            getOptionLabel={(option) => option?.name || ''}
            value={agency || null} // Make sure it's either a valid option or null
            onChange={(_, newValue) => {
              setAgency(newValue);
            }}
            filterOptions={(options, { inputValue }) => options.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()))}
            renderInput={(params) => <TextField {...params} label="Agencja" />}
          />
          <AddEmployee />
        </Box>
        {!isLoading ? (
          <EmployeesTable
            employees={filteredEmployees}
            setSelectedEmployee={setSelectedEmployee}
            handleChangeComponentToRender={handleChangeComponentToRender}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
export default EmployeesHome;
