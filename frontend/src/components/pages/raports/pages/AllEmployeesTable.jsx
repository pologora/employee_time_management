import { styled } from '@mui/material/styles';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const getTimeFromMinutes = (min) => {
  const hours = Math.floor(min / 60);
  const minutes = Math.floor(min % 60);
  return `${hours}g ${minutes}min`;
};

function AllEmployeesTable({ employees }) {
  const [totalWorkTime, setTotalWorkTime] = useState(null);
  const StyledTableRowEmployees = styled(TableRow)(({ theme }) => ({
    '& > *': {
      padding: 0,
      paddingLeft: '10px',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const rows = employees?.map((employee) => {
    const { name, surname, totalWorkMinutes } = employee;

    return {
      name: `${name} ${surname}`,
      totalWorkTime: getTimeFromMinutes(totalWorkMinutes),
    };
  });

  const employeesJson = JSON.stringify(rows);
  console.log(employeesJson);

  useEffect(() => {
    const totalMinutesAllEmployees = employees?.reduce(
      (acc, item) => acc + item.totalWorkMinutes,
      0,
    );
    setTotalWorkTime(getTimeFromMinutes(totalMinutesAllEmployees));
  }, [employees]);

  return !employees ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="Pracownicy table">
        <TableHead>
          <TableRow>
            <TableCell>Imię i nazwisko</TableCell>
            <TableCell align="left">Ilość godzin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRowEmployees key={`${row.name}${row.surname}`}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.totalWorkTime}</TableCell>
            </StyledTableRowEmployees>
          ))}
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Razem:
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              {totalWorkTime}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllEmployeesTable;
