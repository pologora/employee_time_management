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
import WorkTimeUpdateCreateAlert from '../employees/components/WorkTimeUpdateCreateAlert';

function Raporty() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [raportData, setRaportData] = useState(null);
  const [raportRange, setRaportRange] = useState([]);

  const [isOpenTimeEditModal, setIsOpenTimeEditModal] = useState(false);
  const [selectedDayIsoTime, setSelectedDayIsoTime] = useState(null);
  const [timeDocumentId, setTimeDocumentId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  const handleCloseTimeEditModal = () => setIsOpenTimeEditModal(false);
  const handleOpenEditTimeModal = () => setIsOpenTimeEditModal(true);
  const handleTimeDelete = () => console.log('delete');
  const handleTimeUpdate = () => console.log('update');

  const handleTimeUpdateClick = (id, isoTime, empId) => {
    if (id) {
      setTimeDocumentId(id);
    } else {
      setTimeDocumentId(null);
    }
    setEmployeeId(empId);
    setSelectedDayIsoTime(isoTime);
    handleOpenEditTimeModal();
  };

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
          closeTimeEditModal={handleCloseTimeEditModal}
          openTimeEditModal={handleTimeUpdateClick}
          employeeRaport={raportData}
          raportRange={raportRange}
          isButton
        />
      );
      break;
    case 'allSntiRaport':
      componentToRender = (
        <AllSntiRaport
          raportRange={raportRange}
          raport={raportData}
          closeTimeEditModal={handleCloseTimeEditModal}
          openTimeEditModal={handleTimeUpdateClick}
        />
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
      {isOpenTimeEditModal && (
        <WorkTimeUpdateCreateAlert
          open={isOpenTimeEditModal}
          dayIsoTime={selectedDayIsoTime}
          employeeId={employeeId}
          timeDocumentId={timeDocumentId}
          onClose={handleCloseTimeEditModal}
          onTimeSelected={handleTimeUpdate}
          handleTimeDelete={handleTimeDelete}
        />
      )}
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
