import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import getTimeFromMinutes from '../../../../utils/getTimeFromMinutes';

function AllEmployeesTable({ employees, raportRange }) {
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
    <Box sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 10,
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Box>
          <Typography variant="h6">Zakres</Typography>
          <Typography variant="h5">
            {new Date(raportRange[0])?.toLocaleDateString()}
            {' - '}
            {new Date(raportRange[1])?.toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
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
      <Box sx={{ margin: 4, textAlign: 'right' }}>
        <Button variant="contained" color="success">
          Excel
        </Button>
      </Box>
    </Box>
  );
}

export default AllEmployeesTable;
