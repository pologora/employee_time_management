import { styled } from '@mui/material/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';

function EmployeesTable({ employees, setSelectedEmployee, handleChangeComponentToRender }) {
  const handleEdit = (employee) => {
    console.log(employee);
  };

  const handleEmployeeClick = (pin) => {
    console.log(pin);
  };

  const handleWorkTime = (employee) => {
    setSelectedEmployee(employee);
    handleChangeComponentToRender('workTime');
  };

  const StyledTableRowEmployees = styled(TableRow)(({ theme }) => ({
    '& > *': {
      padding: 0,
      paddingLeft: '10px',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const rows = employees.map((employee) => {
    const { name, surname, pin } = employee;

    return {
      name: `${name} ${surname}`,
      pin,
    };
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="Pracownicy table">
        <TableHead>
          <TableRow>
            <TableCell>Imię i nazwisko</TableCell>
            <TableCell align="left">PIN</TableCell>
            <TableCell align="left" />
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRowEmployees key={row.pin} onClick={() => handleEmployeeClick(row)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.pin}</TableCell>
              <TableCell align="left">
                <Button size="small" color="secondary" onClick={() => handleEdit(row)}>
                  edytuj
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button size="small" color="primary" onClick={() => handleWorkTime(row)}>
                  godziny
                </Button>
              </TableCell>
            </StyledTableRowEmployees>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesTable;
