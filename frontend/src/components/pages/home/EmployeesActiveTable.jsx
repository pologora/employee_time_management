import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: 5,
    paddingLeft: 10,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function EmployeesActiveTable({ employees }) {
  let longWorkHours = false;

  const rows = employees.map((employee) => {
    const { name, surname, startWork } = employee;
    const start = new Date(startWork);

    const getTimePassed = () => {
      const now = new Date();
      const diff = now - start;
      const minutes = Math.floor(diff / 1000 / 60);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      longWorkHours = hours > 10;

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
            <StyledTableRow key={row.startWorkTime}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.startWorkTime}</TableCell>
              <TableCell align="left" sx={longWorkHours ? { color: 'red' } : {}}>
                {row.hoursWorked}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesActiveTable;
