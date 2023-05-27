/* eslint-disable no-underscore-dangle */
import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddVacatonAlert from './components/AddVacationAlert';
import Calendar from './pages/Calendar';
import VacationsTable from './pages/VacationsTable';
import VacationsAllEmployees from './pages/VacationsAllEmployees';
import { getSntiEmployees } from '../../../api/employeesApi';
import {
  createVacation,
  deleteVacation,
  updateVacation,
} from '../../../api/vacationsApi';

function Vacations() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [isOpenAddVacationAlert, setIsOpenAddVacationAlert] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSntiEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getSntiEmployees();
      setEmployees(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRealoadData = () => {
    setReload((prev) => !prev);
    handleGetSntiEmployees();
  };

  const handleAddVacation = async (data) => {
    try {
      await createVacation(data);
      handleRealoadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateVacation = async (vacation) => {
    try {
      await updateVacation(vacation);
      handleRealoadData();
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteVacation = async (vacation) => {
    const id = vacation._id;
    try {
      await deleteVacation(id);
      handleRealoadData();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleGetSntiEmployees();
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
          getEmployees={handleGetSntiEmployees}
          updateVacation={handleUpdateVacation}
          deleteVacation={handleDeleteVacation}
        />
      );
      break;
    case 'calendar':
      componentToRender = (
        <Calendar
          reload={reload}
          employees={employees}
          onUpdate={handleUpdateVacation}
          onDelete={handleDeleteVacation}
        />
      );
      break;
    case 'table':
      componentToRender = (
        <VacationsAllEmployees reload={reload} employees={employees} />
      );
      break;
    default:
      componentToRender = (
        <VacationsTable
          reload={reload}
          employees={employees}
          getEmployees={handleGetSntiEmployees}
          updateVacation={handleUpdateVacation}
          deleteVacation={handleDeleteVacation}
        />
      );
      break;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {isOpenAddVacationAlert && (
        <AddVacatonAlert
          onClose={handleCloseAddVacationAlert}
          open={isOpenAddVacationAlert}
          handleAddVacation={handleAddVacation}
          employees={employees}
        />
      )}
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
          <Button onClick={() => setSelectedComponent('table')}>Tablica</Button>
        </Box>
        <Box>
          <Button
            onClick={handleAddVacationClick}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Dodaj urlop
          </Button>
        </Box>
      </Box>
      <Box>{componentToRender}</Box>
    </div>
  );
}
export default Vacations;
