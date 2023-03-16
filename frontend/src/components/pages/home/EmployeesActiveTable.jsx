import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
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
  const rows = employees.map((employee) => {
    const { name, surname, startWork } = employee;
    const start = new Date(startWork);

    const now = new Date();
    const diff = now - start;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const getTimePassed = () => {
      const formatHours = (hoursPassed) => {
        if (hoursPassed === 1) {
          return `${hoursPassed} godzina`;
        }
        if (hoursPassed > 1 && hoursPassed < 5) {
          return `${hoursPassed} godziny`;
        }
        return `${hoursPassed} godzin`;
      };

      const formatMinutes = (minutesPassed) => {
        if (minutesPassed === 1) {
          return `${minutesPassed} minuta`;
        }
        if (minutesPassed > 1 && minutesPassed < 5) {
          return `${minutesPassed} minuty`;
        }
        return `${minutesPassed} minut`;
      };

      const hoursString = formatHours(hours);
      const minutesString = formatMinutes(remainingMinutes);

      return `${hoursString} ${minutesString}`;
    };

    return {
      name: `${name} ${surname}`,
      startWorkTime: start.toLocaleString(),
      hoursWorked: getTimePassed(),
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
          {rows.map((row) => (
            <StyledTableRowEmployeeActive key={row.startWorkTime}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.startWorkTime}</TableCell>
              <TableCell align="left" sx={row.longWorkHours ? { color: 'red' } : {}}>
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