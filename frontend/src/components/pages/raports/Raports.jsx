import { Box, Button } from '@mui/material';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import baseUrl from '../../../options/baseUrl';
import AllEmployeesTable from './pages/AllEmployeesTable';
import SelectOptions from './pages/SelectOptions';

function Raporty() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [allEmployeesAgencja, setAllEmployeesAgencja] = useState(null);
  const { get, error } = useAxios();

  const getAllEmployeesAgencja = async (startDate, endDate) => {
    const url = `${baseUrl}/raports?startDate=${startDate}&endDate=${endDate}`;
    const data = await get(url);
    if (error) {
      alert(error);
    }
    setAllEmployeesAgencja(data);
  };

  const handleAllAgencjaGenerate = (startDate, endDate) => {
    getAllEmployeesAgencja(startDate, endDate);
    setSelectedComponent('allEmployeesAgencja');
  };

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = (
        <SelectOptions handleAllAgencjaGenerate={handleAllAgencjaGenerate} />
      );
      break;
    case 'allEmployeesAgencja':
      componentToRender = <AllEmployeesTable employees={allEmployeesAgencja} />;
      break;
    default:
      componentToRender = <SelectOptions />;
      break;
  }

  return (
    <div>
      <Box component="nav" onClick={() => setSelectedComponent('home')}>
        {selectedComponent !== 'home' && <Button>Wybór raportu</Button>}
      </Box>
      {componentToRender}
    </div>
  );
}
export default Raporty;
