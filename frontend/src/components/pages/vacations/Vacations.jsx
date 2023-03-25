import {
  Alert, Box, Button, Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useAxios from '../../../hooks/useAxios';
import AddVacatonAlert from './components/AddVacationAlert';
import Calendar from './pages/Calendar';
import VacationsTable from './pages/VacationsTable';
import baseUrl from '../../../options/baseUrl';
import severityOptions from '../../../options/severityOptions';

function Vacations() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [isOpenAddVacationAlert, setIsOpenAddVacationAlert] = useState(false);
  const { get, post } = useAxios();
  const [employees, setEmployees] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState(severityOptions.SUCCESS);
  const [reload, setReload] = useState(false);

  const showAlert = (message, severityOp) => {
    setSeverity(severityOp);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const getEmployees = async () => {
    const url = `${baseUrl}/employees?isSnti=true`;
    const data = await get(url);
    if (data) {
      setEmployees(data);
    }
  };

  const handleRealoadData = () => {
    setReload((prev) => !prev);
    getEmployees();
  };

  const handleAddVacation = async (data) => {
    const endpoint = '/vacations';
    const url = `${baseUrl}${endpoint}`;
    const result = await post(url, data);
    if (!(result instanceof Error)) {
      showAlert('Urlop został dodany', severityOptions.SUCCESS);
    } else {
      showAlert(result.message, severityOptions.ERROR);
    }
    handleRealoadData();
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleAddVacationClick = () => {
    setIsOpenAddVacationAlert(true);
  };

  const handleCloseAddVacationAlert = () => {
    setIsOpenAddVacationAlert(false);
  };

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = (
        <VacationsTable
          reload={reload}
          employees={employees}
          getEmployees={getEmployees}
        />
      );
      break;
    case 'calendar':
      componentToRender = <Calendar />;
      break;
    default:
      componentToRender = <VacationsTable />;
      break;
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert}
        autoHideDuration={2000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <AddVacatonAlert
        onClose={handleCloseAddVacationAlert}
        open={isOpenAddVacationAlert}
        handleAddVacation={handleAddVacation}
        employees={employees}
      />
      <Box
        component="nav"
        sx={{
          display: 'flex',
          gap: 3,
          marginBottom: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Button onClick={() => setSelectedComponent('home')}>Lista</Button>
          <Button onClick={() => setSelectedComponent('calendar')}>
            Kalendarz
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleAddVacationClick}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Dodać urlop
          </Button>
        </Box>
      </Box>
      <Box>{componentToRender}</Box>
    </div>
  );
}
export default Vacations;
