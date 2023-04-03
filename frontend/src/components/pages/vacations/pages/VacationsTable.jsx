/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
  IconButton,
  CircularProgress,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SettingsIcon from '@mui/icons-material/Settings';
import baseUrl from '../../../../options/baseUrl';
import useAxios from '../../../../hooks/useAxios';
import vacationTypes from '../../../../options/vacationTypes';
import UpdateVacationAlert from '../components/UpdateVacationAlert';

const StyledTableRowVacations = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getRowColor = (type) => {
  const color = vacationTypes.find((item) => item.label === type)?.color;
  return color || vacationTypes.find((item) => item.label === 'inne').color;
};

function VacationsTable({
  reload, employees, updateVacation, deleteVacation,
}) {
  const [vacations, setVacations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenUpdateeAlert, setIsOpenUpdateAlert] = useState(false);
  const [activeVacation, setActiveVacation] = useState(null);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const { get, isLoading } = useAxios();

  async function getVacations() {
    const url = `${baseUrl}/vacations?page=${page}&employeeId=${
      activeEmployee ? activeEmployee._id : ''
    }`;
    const data = await get(url);
    setVacations(data?.vacationsList);
    if (activeEmployee) {
      setTotalPages(Math.ceil(data.vacationsList.length / 25));
    } else {
      setTotalPages(Math.ceil(data.vacationSize / 25));
    }
  }

  const handleDeleteVacation = async (vacation) => {
    deleteVacation(vacation);
    getVacations();
  };

  const handleUpdateVacation = async (vacation) => {
    updateVacation(vacation);
    getVacations();
  };

  useEffect(() => {
    getVacations();
  }, [page, reload, activeEmployee]);

  useEffect(() => {
    if (employees && activeEmployee) {
      setActiveEmployee((prev) => employees.find((employee) => employee._id === prev._id));
    }
  }, [employees]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleUpdateClick = (vacation) => {
    setActiveVacation(vacation);
    setIsOpenUpdateAlert(true);
  };

  useEffect(() => {
    if (page !== 1) {
      handlePageChange(null, 1);
    }
  }, [activeEmployee]);

  const handleCloseUpdateAlert = () => {
    setIsOpenUpdateAlert(false);
  };

  function formatDate(dateString) {
    if (!dateString) {
      return 'N/A';
    }
    const date = new Date(dateString);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    const formatter = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  }

  const propsAutocompl = {
    options: employees || [],
    getOptionLabel: (option) => `${option.name} ${option.surname}`,
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      <UpdateVacationAlert
        onClose={handleCloseUpdateAlert}
        open={isOpenUpdateeAlert}
        onDelete={handleDeleteVacation}
        vacation={activeVacation}
        onUpdate={handleUpdateVacation}
        employees={employees}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Autocomplete
          value={activeEmployee}
          onChange={(e, value) => {
            setActiveEmployee(value);
          }}
          {...propsAutocompl}
          disablePortal
          sx={{ width: '35%', paddingTop: 2, paddingBottom: 2 }}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField {...params} label="Wybierz pracownika" />
          )}
        />
        {activeEmployee && (
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginRight: 10 }}>
            <Typography color="#00693E">
              Liczba przysługujących dni urlopu:
              <Typography
                component="span"
                sx={{ marginLeft: 1, fontWeight: 'bold' }}
              >
                {activeEmployee && activeEmployee.vacationDaysPerYear}
              </Typography>
            </Typography>
            <Typography color="#00693E">
              Wykorzystane dni:
              <Typography
                component="span"
                sx={{ marginLeft: 1, fontWeight: 'bold' }}
              >
                {activeEmployee && activeEmployee.vacations}
              </Typography>
            </Typography>
          </Box>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="vacations table">
          <TableHead>
            <TableRow>
              <TableCell>Imię nazwisko</TableCell>
              <TableCell>Początek</TableCell>
              <TableCell>Koniec</TableCell>
              <TableCell>Długość</TableCell>
              <TableCell>Rodzaj</TableCell>
              <TableCell>Akcja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacations?.map((vacation) => (
              <StyledTableRowVacations key={vacation._id}>
                <TableCell>
                  {vacation.name}
                  {' '}
                  {vacation.surname}
                </TableCell>
                <TableCell>{formatDate(vacation.startVacation)}</TableCell>
                <TableCell>{formatDate(vacation.endVacation)}</TableCell>
                <TableCell>
                  {vacation.duration}
                  {' '}
                  Dni
                </TableCell>
                <TableCell
                  sx={{
                    color: getRowColor(vacation.type),
                  }}
                >
                  {vacation.type}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{
                      color: '#8806CE',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#6C3082',
                      },
                    }}
                    onClick={() => handleUpdateClick(vacation)}
                  >
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRowVacations>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
}

export default VacationsTable;
