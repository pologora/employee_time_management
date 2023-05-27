import { Box, Button } from '@mui/material';
import { useState } from 'react';
import AllEmployeesTable from './pages/AllEmployeesTable';
import AllSntiRaport from './pages/AllSntiRaport';
import SelectOptions from './pages/SelectOptions';
import SingleEmployeeRaport from './pages/SingleEmployeeRaport';
import {
  getAllAgencjaRaport,
  getAllSntiRaport,
  getEmployeeRaportByIdAndDate,
} from '../../../api/raportsApi';

function Raporty() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [raportData, setRaportData] = useState(null);
  const [raportRange, setRaportRange] = useState([]);

  const handleSingleEmployeeRaport = async (id, startDate, endDate) => {
    try {
      const data = await getEmployeeRaportByIdAndDate(id, startDate, endDate);
      setRaportData(data);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('singleEmployee');
    } catch (error) {
      alert(error);
    }
  };

  const handleAllAgencjaGenerate = async (startDate, endDate) => {
    try {
      const data = await getAllAgencjaRaport(startDate, endDate);
      setRaportData(data);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('allEmployeesAgencja');
    } catch (error) {
      alert(error);
    }
  };

  const handleAllSntiRaport = async (startDate, endDate) => {
    try {
      const data = await getAllSntiRaport(startDate, endDate);
      setRaportData(data);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('allSntiRaport');
    } catch (err) {
      alert(err);
    }
  };

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = (
        <SelectOptions
          handleAllAgencjaGenerate={handleAllAgencjaGenerate}
          handleSingleEmployeeRaport={handleSingleEmployeeRaport}
          handleAllSntiRaport={handleAllSntiRaport}
        />
      );
      break;
    case 'allEmployeesAgencja':
      componentToRender = (
        <AllEmployeesTable employees={raportData} raportRange={raportRange} />
      );
      break;
    case 'singleEmployee':
      componentToRender = (
        <SingleEmployeeRaport
          employeeRaport={raportData}
          raportRange={raportRange}
          isButton
        />
      );
      break;
    case 'allSntiRaport':
      componentToRender = (
        <AllSntiRaport raportRange={raportRange} raport={raportData} />
      );
      break;
    default:
      componentToRender = (
        <SelectOptions
          handleAllAgencjaGenerate={handleAllAgencjaGenerate}
          handleSingleEmployeeRaport={handleSingleEmployeeRaport}
          handleAllSntiRaport={handleAllSntiRaport}
        />
      );
      break;
  }

  return (
    <div>
      <Box component="nav">
        {selectedComponent !== 'home' && (
          <Button onClick={() => setSelectedComponent('home')}>
            Wybór raportu
          </Button>
        )}
      </Box>
      {componentToRender}
    </div>
  );
}
export default Raporty;
