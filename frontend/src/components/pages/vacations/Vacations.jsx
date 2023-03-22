import { Box, Button } from '@mui/material';
import { useState } from 'react';
import Calendar from './pages/Calendar';
import VacationsHome from './pages/VacationsHome';

function Vacations() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [isOpenAddVacationAlert, setIsOpenAddVacationAlert] = useState(false);

  const handleAddVacationClick = () => {
    setIsOpenAddVacationAlert(true);
  };

  const handleAddVacation = (employeeId, startDate, endDate) => {};

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = <VacationsHome />;
      break;
    case 'calendar':
      componentToRender = <Calendar />;
      break;
    default:
      componentToRender = <VacationsHome />;
      break;
  }

  return (
    <div>
      <Box component="nav">
        <Button onClick={handleAddVacationClick}>Dodaj</Button>
        <Button onClick={() => setSelectedComponent('home')}>Lista</Button>
        <Button onClick={() => setSelectedComponent('calendar')}>Kalendarz</Button>
      </Box>
      <Box>{componentToRender}</Box>
    </div>
  );
}
export default Vacations;
