import { styled } from '@mui/material/styles';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import './style.css';
import { useState } from 'react';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DeleteAlert from './DeleteAlert';
import UpdateAlert from './UpdateAlert';
import WorkHoursAlert from './WorkHoursAlert';
import { deleteEmployeeById } from '../../../../api/employeesApi';
import {
  sortAlphabeticallyAscending,
  sortAlphabeticallyDescending,
  sortByPinAscending,
  sortByPinDescending,
} from '../../../../helpers/sortFuncs';
import { useEmployeesContext } from '../../../../contexts/employeeContext';
import { useAgenciesContext } from '../../../../contexts/agenciesContext';
import getAgienciesIdToNameMap from '../../../../helpers/getAgenciesIdToNameMap';

const sortingOrder = Object.freeze({
  Descending: 'descending',
  Ascending: 'ascending',
});

function EmployeesTable({
  setSelectedEmployee,
  handleChangeComponentToRender,
  employees,
}) {
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isOpenUpdateAlert, setIsOpenUpdateAlert] = useState(false);
  const [isOpenWorkHoursAlert, setIsOpenWorkHoursAlert] = useState(false);
  const { fetchEmployees } = useEmployeesContext();
  const { agencies } = useAgenciesContext();
  const [isSorted, setIsSorted] = useState({
    byName: {
      sorted: false,
      order: '',
    },
    byPin: {
      sorted: false,
      order: '',
    },
  });

  const agenciesMap = getAgienciesIdToNameMap(agencies);

  function getNameSortingIcon() {
    if (isSorted.byName.order === sortingOrder.Ascending) {
      return <KeyboardDoubleArrowDownIcon color="primary" />;
    }
    if (isSorted.byName.order === sortingOrder.Descending) {
      return <KeyboardDoubleArrowUpIcon color="primary" />;
    }
    return <SortByAlphaIcon />;
  }

  function getPinSortingIcon() {
    if (isSorted.byPin.order === sortingOrder.Ascending) {
      return <KeyboardDoubleArrowDownIcon color="primary" />;
    }
    if (isSorted.byPin.order === sortingOrder.Descending) {
      return <KeyboardDoubleArrowUpIcon color="primary" />;
    }
    return <UnfoldMoreDoubleIcon />;
  }

  const handleOpenUpdateAlert = (employee) => {
    setActiveEmployee(employee);
    setIsOpenUpdateAlert(true);
  };

  const hadleCloseUpdateAlert = () => {
    setIsOpenUpdateAlert(false);
  };

  const handleDeleteEmployee = async (employee) => {
    const { id } = employee;
    try {
      await deleteEmployeeById(id);
      fetchEmployees();
    } catch (error) {
      alert(error);
    }
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

  const handleSortByName = () => {
    if (
      !isSorted.byName.sorted
      || isSorted.byName.order === sortingOrder.Descending
    ) {
      employees.sort(sortAlphabeticallyAscending);
      setIsSorted((prev) => ({
        ...prev,
        byName: {
          order: sortingOrder.Ascending,
          sorted: true,
        },
        byPin: {
          order: '',
          sorted: false,
        },
      }));
    } else if (isSorted.byName.order === sortingOrder.Ascending) {
      employees.sort(sortAlphabeticallyDescending);
      setIsSorted((prev) => ({
        ...prev,
        byName: {
          order: sortingOrder.Descending,
          sorted: true,
        },
        byPin: {
          order: '',
          sorted: false,
        },
      }));
    }
  };

  const handleSortByPin = () => {
    if (
      !isSorted.byPin.sorted
      || isSorted.byPin.order === sortingOrder.Descending
    ) {
      employees.sort(sortByPinAscending);
      setIsSorted((prev) => ({
        ...prev,
        byPin: {
          order: sortingOrder.Ascending,
          sorted: true,
        },
        byName: {
          order: '',
          sorted: false,
        },
      }));
    } else if (isSorted.byPin.order === sortingOrder.Ascending) {
      employees.sort(sortByPinDescending);
      setIsSorted((prev) => ({
        ...prev,
        byPin: {
          order: sortingOrder.Descending,
          sorted: true,
        },
        byName: {
          order: '',
          sorted: false,
        },
      }));
    }
  };

  const StyledTableRowEmployees = styled(TableRow)(({ theme }) => ({
    '& > *': {
      padding: '0 0 0 5px !important',
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
      agency,
    } = employee;

    return {
      name: `${name} ${surname}`,
      vacationDaysPerYear,
      pin,
      isSnti,
      id,
      agency: agenciesMap.get(agency) || 'SNTI',
    };
  });

  return (
    <>
      {isOpenDeleteAlert && (
        <DeleteAlert
          open={isOpenDeleteAlert}
          onClose={handleCloseDeleteAlert}
          onDelete={handleDeleteEmployee}
          employee={activeEmployee}
        />
      )}
      {isOpenUpdateAlert && (
        <UpdateAlert
          open={isOpenUpdateAlert}
          onClose={hadleCloseUpdateAlert}
          employee={activeEmployee}
          getEmployees={fetchEmployees}
        />
      )}
      {isOpenWorkHoursAlert && (
        <WorkHoursAlert
          open={isOpenWorkHoursAlert}
          onClose={handleCloseOpenWorkHoursAlert}
          employee={activeEmployee}
          onDateRangeSelected={handleDateRangeSelected}
        />
      )}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="Pracownicy table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className="inline-elements" mr={1}>
                  Imię i nazwisko
                </Typography>
                <IconButton
                  aria-label="sort by name"
                  onClick={handleSortByName}
                  className="inline-elements"
                >
                  {getNameSortingIcon()}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <Typography className="inline-elements" mr={1}>
                  PIN
                </Typography>
                <IconButton
                  aria-label="sort by PIN"
                  onClick={handleSortByPin}
                  className="inline-elements"
                >
                  {getPinSortingIcon()}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <Typography className="inline-elements" mr={1}>
                  Agencja
                </Typography>
              </TableCell>
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
                <TableCell align="left">{row.agency}</TableCell>
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
                    usuń
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
