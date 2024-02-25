import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';

const StyledTableRowEmployeeActive = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '3px !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function EmployeesActiveTable({ employees }) {
  const rows = employees?.map((employee) => {
    const { name, surname, startWork } = employee;
    console.log(employee);
    const start = new Date(startWork).toISOString().slice(11, 16);

    const startWorkLocal = new Date(startWork);
    startWorkLocal.setMinutes(
      startWorkLocal.getMinutes() + startWorkLocal.getTimezoneOffset(),
    );

    const now = new Date();

    const minutesWork = (now.getTime() - startWorkLocal.getTime()) / (1000 * 60);
    const hours = Math.floor(minutesWork / 60);
    const minutes = Math.round(minutesWork % 60);

    return {
      name: `${name} ${surname}`,
      startWorkTime: start,
      hoursWorked: `${hours}h ${minutes}min`,
      longWorkHours: hours > 10,
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Pracownicy table">
        <TableHead>
          <TableRow>
            <TableCell>Imię i nazwisko</TableCell>
            <TableCell align="left">Pracuje od</TableCell>
            <TableCell align="left">Czas pracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRowEmployeeActive
              key={`${row.startWorkTime}+${row.name}`}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.startWorkTime}</TableCell>
              <TableCell
                align="left"
                sx={row.longWorkHours ? { color: 'red' } : {}}
              >
                {row.hoursWorked}
              </TableCell>
            </StyledTableRowEmployeeActive>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesActiveTable;
