import { Box, Button } from '@mui/material';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import baseUrl from '../../../options/baseUrl';
import AllEmployeesTable from './pages/AllEmployeesTable';
import AllSntiRaport from './pages/AllSntiRaport';
import SelectOptions from './pages/SelectOptions';
import SingleEmployeeRaport from './pages/SingleEmployeeRaport';

function Raporty() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [allEmployeesAgencja, setAllEmployeesAgencja] = useState(null);
  const [employeeRaport, setEmployeeRaport] = useState(null);
  const [raportRange, setRaportRange] = useState([]);
  const { get, error } = useAxios();

  const getAllEmployeesAgencja = async (startDate, endDate) => {
    const url = `${baseUrl}/raports?startDate=${startDate}&endDate=${endDate}`;

    return get(url);
  };

  const getEmployeeData = async (id, startDate, endDate) => {
    const url = `${baseUrl}/raports/employeeId?employeeId=${id}&startDate=${startDate}&endDate=${endDate}`;

    return get(url);
  };

  const getAllSntiRaport = async (startDate, endDate) => {
    const url = `${baseUrl}/raports/snti?startDate=${startDate}&endDate=${endDate}`;

    return get(url);
  };

  const handleSingleEmployeeRaport = async (id, startDate, endDate) => {
    const data = await getEmployeeData(id, startDate, endDate);
    try {
      setEmployeeRaport(data);
    } catch (err) {
      alert(err);
    }
    setRaportRange([startDate, endDate]);
    setSelectedComponent('singleEmployee');
  };

  const handleAllAgencjaGenerate = async (startDate, endDate) => {
    const data = await getAllEmployeesAgencja(startDate, endDate);
    if (error) {
      alert(error);
    }
    setAllEmployeesAgencja(data);
    setRaportRange([startDate, endDate]);
    setSelectedComponent('allEmployeesAgencja');
  };

  const handleAllSntiRaport = async (startDate, endDate) => {
    try {
      const data = await getAllSntiRaport(startDate, endDate);
      setAllEmployeesAgencja(data);
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
        <AllEmployeesTable
          employees={allEmployeesAgencja}
          raportRange={raportRange}
        />
      );
      break;
    case 'singleEmployee':
      componentToRender = (
        <SingleEmployeeRaport
          employeeRaport={employeeRaport}
          raportRange={raportRange}
        />
      );
      break;
    case 'allSntiRaport':
      componentToRender = <AllSntiRaport raportRange={raportRange} />;
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
