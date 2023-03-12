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
// import { useState } from 'react';

function EmployeesTable({ employees }) {
  const handleEdit = (employee) => {
    // setModalOpen(true);
    console.log(employee);
  };

  const handleEmployeeClick = (pin) => {
    console.log(pin);
  };

  const handleWorkTime = (pin) => {
    console.log(pin);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
            <StyledTableRow key={row.pin} onClick={() => handleEmployeeClick(row.pin)}>
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
                <Button size="small" color="primary" onClick={() => handleWorkTime(row.pin)}>
                  godziny
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesTable;
