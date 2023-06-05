/* eslint-disable no-param-reassign */
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
import { tableCellClasses } from '@mui/material/TableCell';
import EditableTableCell from '../components/EditableTableCell';
import {
  getAllVacationsByTimeAndType,
  getLastYearVacationDaysLeft,
  updateLastYearVacationLeftDays,
} from '../../../../api/vacationsApi';

const StyledTableRowVacations = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '3px !important',
    paddingLeft: '10px !important',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#36454F',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function VacationsAllEmployees({ reload, employees }) {
  const [vacationsData, setVacationsData] = useState(null);
  const [lastYearVacationLeftDays, setLastYearVacationLeftDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllVacations = async () => {
    setIsLoading(true);
    try {
      const data = { type: 'Wypoczynkowy' };
      const vacations = await getAllVacationsByTimeAndType(data);
      setVacationsData(vacations);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllVacations();
  }, [reload]);

  const processData = (vacationsD) => {
    const currentYear = new Date().getFullYear();
    const employeesVacations = {};

    vacationsD?.forEach((vacation) => {
      const { employeeId, duration } = vacation;
      const startDate = new Date(vacation.startVacation);

      if (!employeesVacations[employeeId]) {
        employeesVacations[employeeId] = {
          name: `${vacation.name} ${vacation.surname}`,
          employeeId: vacation.employeeId,
          lastYearLeft: +vacation.lastYearLeft,
          vacationsThisYear: +vacation.vacationsThisYear,
          months: Array(12).fill(0),
          tookedInThisYear: 0,
          daysLeft: 0,
        };
      }

      if (startDate.getFullYear() === currentYear) {
        const month = startDate.getMonth();
        employeesVacations[employeeId].months[month] += duration;
        employeesVacations[employeeId].tookedInThisYear += duration;
        employeesVacations[employeeId].daysLeft = employeesVacations[employeeId].vacationsThisYear
          - employeesVacations[employeeId].tookedInThisYear
          + employeesVacations[employeeId].lastYearLeft;
      }
    });

    return Object.values(employeesVacations)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((employee) => {
        const row = {
          name: employee.name,
          id: employee.employeeId,
          lastYearLeft: employee.lastYearLeft,
          vacationsThisYear: employee.vacationsThisYear,
          tookedInThisYear: employee.tookedInThisYear,
          daysLeft: employee.daysLeft,
        };

        for (let i = 0; i < 12; i += 1) {
          row[i + 1] = employee.months[i];
        }

        return row;
      });
  };

  const combineEployeeDaysLeftAndHoleDaysPerYear = (
    employeesData,
    daysLeftLastYear,
  ) => employeesData?.map((employee) => {
    const foundItem = daysLeftLastYear
      ? daysLeftLastYear.find((item) => item.employeeId === employee._id)
      : null;

    const daysLeft = foundItem ? foundItem.daysLeft : 0;

    return {
      employeeId: employee._id,
      lastYearLeft: +daysLeft,
      vacationsThisYear: +employee.vacationDaysPerYear,
    };
  });

  const moreData = combineEployeeDaysLeftAndHoleDaysPerYear(
    employees,
    lastYearVacationLeftDays,
  );

  const combineData = (processedData, additionalData) => processedData?.map((employee) => {
    const matchingData = additionalData?.find(
      (data) => data.employeeId === employee.employeeId,
    );

    if (matchingData) {
      employee.lastYearLeft = +matchingData.lastYearLeft;
      employee.vacationsThisYear = +matchingData.vacationsThisYear;
    }

    return employee;
  });

  combineData(vacationsData, moreData);

  const rows = processData(vacationsData);

  const handleUpdateLastYearVacationLeftDays = async (days, id) => {
    try {
      return updateLastYearVacationLeftDays(days, id);
    } catch (error) {
      return alert(error);
    }
  };

  const handleGetLastYearVacationDaysLeft = async () => {
    const data = await getLastYearVacationDaysLeft();
    setLastYearVacationLeftDays(data);
  };

  const onValueChange = async (value, employeeId) => {
    await handleUpdateLastYearVacationLeftDays(value, employeeId);
    handleGetLastYearVacationDaysLeft();
  };

  useEffect(() => {
    handleGetLastYearVacationDaysLeft();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 10 }}>
      <Table sx={{ minWidth: 650 }} aria-label="Pracownicy table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Imię i nazwisko</StyledTableCell>
            <StyledTableCell align="center" style={{ width: 2 }}>
              Urlop zaległy
            </StyledTableCell>
            <StyledTableCell align="center" style={{ width: 2 }}>
              Urlop przysługujący
            </StyledTableCell>
            <StyledTableCell align="center">1</StyledTableCell>
            <StyledTableCell align="center">2</StyledTableCell>
            <StyledTableCell align="center">3</StyledTableCell>
            <StyledTableCell align="center">4</StyledTableCell>
            <StyledTableCell align="center">5</StyledTableCell>
            <StyledTableCell align="center">6</StyledTableCell>
            <StyledTableCell align="center">7</StyledTableCell>
            <StyledTableCell align="center">8</StyledTableCell>
            <StyledTableCell align="center">9</StyledTableCell>
            <StyledTableCell align="center">10</StyledTableCell>
            <StyledTableCell align="center">11</StyledTableCell>
            <StyledTableCell align="center">12</StyledTableCell>
            <StyledTableCell align="center" style={{ width: 2 }}>
              Wybrano
            </StyledTableCell>
            <StyledTableCell align="center" style={{ Width: 2 }}>
              Pozostało
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <StyledTableRowVacations align="center">
              <TableCell>
                <CircularProgress
                  sx={{ display: 'absolute', top: '50%', left: '50%' }}
                />
              </TableCell>
            </StyledTableRowVacations>
          ) : (
            rows?.map((row) => (
              <StyledTableRowVacations key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <EditableTableCell
                  align="center"
                  value={row.lastYearLeft}
                  employeeId={row.id}
                  onValueChange={onValueChange}
                />
                <TableCell align="center" sx={{ color: '#0070BB' }}>
                  {row.vacationsThisYear}
                </TableCell>
                <TableCell align="center">{row[1]}</TableCell>
                <TableCell align="center">{row[2]}</TableCell>
                <TableCell align="center">{row[3]}</TableCell>
                <TableCell align="center">{row[4]}</TableCell>
                <TableCell align="center">{row[5]}</TableCell>
                <TableCell align="center">{row[6]}</TableCell>
                <TableCell align="center">{row[7]}</TableCell>
                <TableCell align="center">{row[8]}</TableCell>
                <TableCell align="center">{row[9]}</TableCell>
                <TableCell align="center">{row[10]}</TableCell>
                <TableCell align="center">{row[11]}</TableCell>
                <TableCell align="center">{row[12]}</TableCell>
                <TableCell align="center" sx={{ color: 'red' }}>
                  {row.tookedInThisYear}
                </TableCell>
                <TableCell align="center" sx={{ color: 'green' }}>
                  {row.daysLeft}
                </TableCell>
              </StyledTableRowVacations>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VacationsAllEmployees;
