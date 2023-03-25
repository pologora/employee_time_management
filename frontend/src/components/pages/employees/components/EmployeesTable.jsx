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
import baseUrl from '../../../../options/baseUrl';
import DeleteAlert from './DeleteAlert';
import UpdateAlert from './UpdateAlert';
import useAxios from '../../../../hooks/useAxios';
import WorkHoursAlert from './WorkHoursAlert';

function EmployeesTable({
  employees,
  setSelectedEmployee,
  handleChangeComponentToRender,
  getEmployees,
}) {
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isOpenUpdateAlert, setIsOpenUpdateAlert] = useState(false);
  const [isOpenWorkHoursAlert, setIsOpenWorkHoursAlert] = useState(false);
  const { deleteItem } = useAxios();

  const handleOpenUpdateAlert = (employee) => {
    setActiveEmployee(employee);
    setIsOpenUpdateAlert(true);
  };

  const hadleCloseUpdateAlert = () => {
    setIsOpenUpdateAlert(false);
  };

  const handleDeleteEmployee = async (employee) => {
    const { id } = employee;
    const url = `${baseUrl}/employee?id=${id}`;
    await deleteItem(url);

    getEmployees();
  };

  const handleOpendDeleteAlert = (employee) => {
    setIsOpenDeleteAlert(true);
    setActiveEmployee(employee);
  };

  const handleCloseDeleteAlert = () => {
    setIsOpenDeleteAlert(false);
  };

  const handleOpenWorkHoursAlert = (employee) => {
    setIsOpenWorkHoursAlert(true);
    setActiveEmployee(employee);
  };

  const handleCloseOpenWorkHoursAlert = () => {
    setIsOpenWorkHoursAlert(false);
  };

  const handleDateRangeSelected = (employee, startDate, endDate) => {
    setSelectedEmployee(employee, startDate, endDate);
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

  const rows = employees?.map((employee) => {
    const {
      name,
      surname,
      pin,
      _id: id,
      vacationDaysPerYear,
      isSnti,
    } = employee;

    return {
      name: `${name} ${surname}`,
      vacationDaysPerYear,
      pin,
      isSnti,
      id,
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
      <WorkHoursAlert
        open={isOpenWorkHoursAlert}
        onClose={handleCloseOpenWorkHoursAlert}
        employee={activeEmployee}
        onDateRangeSelected={handleDateRangeSelected}
      />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="Pracownicy table">
          <TableHead>
            <TableRow>
              <TableCell>Imię i nazwisko</TableCell>
              <TableCell align="left">PIN</TableCell>
              <TableCell align="left">Urlop</TableCell>
              <TableCell align="left" />
              <TableCell align="left" />
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRowEmployees key={row.pin}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.pin}</TableCell>
                <TableCell align="left">
                  {row.isSnti ? row.vacationDaysPerYear : null}
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleOpenUpdateAlert(row)}
                  >
                    edytuj
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpenWorkHoursAlert(row)}
                  >
                    godziny
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleOpendDeleteAlert(row)}
                  >
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
