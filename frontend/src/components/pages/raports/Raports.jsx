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
import WorkTimeUpdateCreateAlert from '../employees/WorkTimeUpdateCreateAlert';

function Raporty() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [raportData, setRaportData] = useState(null);
  const [raportRange, setRaportRange] = useState([]);

  const [isOpenTimeEditModal, setIsOpenTimeEditModal] = useState(false);
  const [selectedDayIsoTime, setSelectedDayIsoTime] = useState(null);
  const [timeDocumentId, setTimeDocumentId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [lastReport, setLastReport] = useState(null);

  const handleCloseTimeEditModal = () => setIsOpenTimeEditModal(false);
  const handleOpenEditTimeModal = () => setIsOpenTimeEditModal(true);

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
      const { data } = await getEmployeeRaportByIdAndDate(id, startDate, endDate);
      setRaportData(data.data);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('singleEmployee');
      setLastReport('single');
    } catch (error) {
      alert(error);
    }
  };

  const handleAllAgencjaGenerate = async (startDate, endDate, agency) => {
    try {
      const { data } = await getAllAgencjaRaport(startDate, endDate);
      let filteredData = data.data;
      if (agency) {
        const id = agency?._id || '';
        if (id) {
          filteredData = data.data.filter((item) => item.agency === id);
        }
      }
      setRaportData(filteredData);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('allEmployeesAgencja');
    } catch (error) {
      alert(error);
    }
  };

  const handleAllSntiRaport = async (startDate, endDate) => {
    try {
      const { data } = await getAllSntiRaport(startDate, endDate);
      setRaportData(data?.data);
      setRaportRange([startDate, endDate]);
      setSelectedComponent('allSntiRaport');
      setLastReport('allSnti');
    } catch (err) {
      alert(err);
    }
  };

  const getEmployeeWorkTime = () => {
    if (lastReport === 'allSnti') {
      handleAllSntiRaport(raportRange[0], raportRange[1]);
    } else if (lastReport === 'single') {
      handleSingleEmployeeRaport(employeeId, raportRange[0], raportRange[1]);
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
          getEmployeeWorkTime={getEmployeeWorkTime}
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
