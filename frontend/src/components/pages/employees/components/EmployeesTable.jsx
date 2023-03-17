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
import { useState } from 'react';
import DeleteAlert from './DeleteAlert';
import UpdateAlert from './UpdateAlert';
import useAxios from '../../../../hooks/useAxios';

function EmployeesTable({
  employees,
  setSelectedEmployee,
  handleChangeComponentToRender,
  getEmployees,
}) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [isOpenUpdateAlert, setIsOpenUpdateAlert] = useState(false);
  const { deleteItem } = useAxios();

  const handleOpenUpdateAlert = (employee) => {
    setActiveEmployee(employee);
    setIsOpenUpdateAlert(true);
  };

  const hadleCloseUpdateAlert = () => {
    setIsOpenUpdateAlert(false);
  };

  const handleDeleteEmployee = async (employee) => {
    const { pin } = employee;
    const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employee?pin=${pin}`;
    const deleted = await deleteItem(url);

    if (deleted.deletedCount === 1) {
      alert('Successfully deleted');
      getEmployees();
    } else {
      alert('No documents matched');
    }
  };

  const handleEmployeeClick = (pin) => {
    console.log(pin);
  };

  const handleOpendDeleteAlert = (employee) => {
    setIsOpenDeleteAlert(true);
    setActiveEmployee(employee);
  };

  const handleCloseDeleteAlert = () => {
    setIsOpenDeleteAlert(false);
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
    <>
      <DeleteAlert
        open={isOpenDeleteAlert}
        onClose={handleCloseDeleteAlert}
        onDelete={handleDeleteEmployee}
        employee={activeEmployee}
      />
      <UpdateAlert
        open={isOpenUpdateAlert}
        onClose={hadleCloseUpdateAlert}
        employee={activeEmployee}
        getEmployees={getEmployees}
      />
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
                  <Button size="small" color="secondary" onClick={() => handleOpenUpdateAlert(row)}>
                    edytuj
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button size="small" color="primary" onClick={() => handleWorkTime(row)}>
                    godziny
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button size="small" color="error" onClick={() => handleOpendDeleteAlert(row)}>
                    delete
                  </Button>
                </TableCell>
              </StyledTableRowEmployees>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EmployeesTable;
