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
  // Typography,
  Box,
  styled,
  IconButton,
  CircularProgress,
  Autocomplete,
  TextField,
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
  return color || '#29AB87';
};

function VacationsTable({ reload, employees, getEmployees }) {
  const [vacations, setVacations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenUpdateeAlert, setIsOpenUpdateAlert] = useState(false);
  const [activeVacation, setActiveVacation] = useState(null);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const {
    get, deleteItem, post, isLoading,
  } = useAxios();

  async function getVacations() {
    const url = `${baseUrl}/vacations?page=${page}&employeeId=${
      activeEmployee ? activeEmployee._id : ''
    }`;
    const data = await get(url);
    setVacations(data.vacationsList);
    setTotalPages(Math.ceil(data.vacationSize / 25));
  }

  const handleDeleteVacation = async (vacation) => {
    const url = `${baseUrl}/vacations?id=${vacation._id}`;
    await deleteItem(url);
    getVacations();
    getEmployees();
  };

  const handleUpdateVacation = async (vacation) => {
    const url = `${baseUrl}/vacations/update?id=${vacation.id}`;
    await post(url, vacation);
    getVacations();
    getEmployees();
  };

  useEffect(() => {
    getVacations();
  }, [page, reload, activeEmployee]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleUpdateClick = (vacation) => {
    setActiveVacation(vacation);
    setIsOpenUpdateAlert(true);
  };

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
      {/* <Typography variant="h4">Vacations</Typography> */}
      <Autocomplete
        value={activeEmployee}
        onChange={(e, value) => {
          setActiveEmployee(value);
        }}
        {...propsAutocompl}
        disablePortal
        sx={{ width: '35%', paddingTop: 2, paddingBottom: 2 }}
        renderInput={(params) => (
          <TextField {...params} label="Wybierz pracownika" />
        )}
      />
      <TableContainer component={Paper}>
        <Table aria-label="vacations table">
          <TableHead>
            <TableRow>
              <TableCell>Imię nazwisko</TableCell>
              <TableCell>Początek</TableCell>
              <TableCell>Koniec</TableCell>
              <TableCell>Długość</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Actions</TableCell>
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
