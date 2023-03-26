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

function AllEmployeesTable({ employees }) {
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
      totalWorkMinutes,
    };
  });

  return (
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
            <StyledTableRowEmployees key={row.pin}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.totalWorkMinutes}</TableCell>
            </StyledTableRowEmployees>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllEmployeesTable;
