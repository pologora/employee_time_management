import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useState } from 'react';
import createCalendarArray from '../../../../utils/createCalendarArray';
import WorkTimeUpdateCreateAlert from './WorkTimeUpdateCreateAlert';
import {
  createTime,
  deleteTime,
  updateTime,
  getTimeById,
} from '../../../../api/workTimeApi';
import getTimeFromMinutes from '../../../../utils/getTimeFromMinutes';
import totalWorkTimeInMinutes from '../../../../utils/timeOperation/totalWorkTimeInMinutes';
import oneDocumentTotalTimeInMinutes from '../../../../utils/timeOperation/oneDocumentTotalTimeInMinutes';

const StyledTableRowWorkTime = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '2px !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function WorkTimeTable({
  workTime,
  handleChangeComponentToRender,
  selectedEmployee,
  getEmployeeWorkTime,
}) {
  const [isOpenUpdateCreateWorkTime, setisOpenUpdateCreateWorkTime] = useState(false);
  const [selectedWorkTimeDocument, setSelectedWorkTimeDocument] = useState(null);
  const [selectedDayIsoTime, setSelectedDayIsoTime] = useState(null);
  const {
    employee: { name, id: employeeId },
    startDate,
    endDate,
  } = selectedEmployee;
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  const getSelectedTimeDocument = async (id) => {
    setIsLoading(true);
    try {
      const workDocument = await getTimeById(id);
      setSelectedWorkTimeDocument(workDocument);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdateClick = (id, isoTime) => {
    if (id.length > 10) {
      getSelectedTimeDocument(id);
    } else {
      setSelectedWorkTimeDocument(null);
    }
    setSelectedDayIsoTime(isoTime);
    setisOpenUpdateCreateWorkTime(true);
  };

  const handleUpdateTimeAlertClose = () => {
    setisOpenUpdateCreateWorkTime(false);
  };

  const handleTimeUpdate = async (id, startWork, endWork) => {
    setIsLoading(true);
    try {
      if (!id) {
        await createTime(employeeId, startWork, endWork);
      } else {
        await updateTime(id, startWork, endWork);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

    getEmployeeWorkTime();
  };

  const handleTimeDelete = async (id) => {
    try {
      await deleteTime(id);
      getEmployeeWorkTime();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const emptyErray = createCalendarArray(startDate, endDate);

  const workHoursDataArray = workTime?.map((workDocument) => {
    const { _id, startWork, endWork } = workDocument;
    const localTime = new Date(startWork);
    localTime.setMinutes(
      localTime.getMinutes() + localTime.getTimezoneOffset(),
    );
    const dayStartWork = localTime.getDate();

    const totalTimeInMinutes = oneDocumentTotalTimeInMinutes(
      startWork,
      endWork,
    );
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = Math.floor(totalTimeInMinutes % 60);
    const totalWorkTime = `${hours}g ${minutes}m`;

    return {
      id: _id,
      day: dayStartWork,
      totalTimeWork: totalWorkTime,
      startWork,
      endWork,
    };
  });

  const workTimeTableRows = emptyErray.map((dayData) => {
    const { day, isoTime } = dayData;
    const workHoursData = workHoursDataArray?.filter(
      (workHours) => workHours.day === day,
    );

    if (workHoursData && workHoursData.length > 0) {
      const totalTimeInMinutes = workHoursData.reduce((acc, curr) => {
        const { startWork, endWork } = curr;
        const minutesWork = oneDocumentTotalTimeInMinutes(startWork, endWork);
        return acc + Math.round(minutesWork);
      }, 0);

      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const total = `${hours}h ${minutes}min`;

      const start = workHoursData[0].startWork.slice(11, 16);
      const end = workHoursData[workHoursData.length - 1].endWork?.slice(11, 16) || null;

      return {
        id: workHoursData[0].id,
        startWork: start,
        endWork: end,
        total,
        day,
        dayOfWeek: dayData.dayOfWeek,
        isoTime,
      };
    }

    return dayData;
  });

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openAlert}
        autoHideDuration={2000}
        onClose={() => setOpenAlert(false)}
      />
      {isOpenUpdateCreateWorkTime && (
        <WorkTimeUpdateCreateAlert
          open={isOpenUpdateCreateWorkTime}
          onClose={handleUpdateTimeAlertClose}
          onTimeSelected={handleTimeUpdate}
          selectedWorkTimeDocument={selectedWorkTimeDocument}
          dayIsoTime={selectedDayIsoTime}
          handleTimeDelete={handleTimeDelete}
        />
      )}
      <Button onClick={handleAllEmployeesClick}>Wszyscy pracownicy</Button>
      <Typography variant="h4">{`${name}`}</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="Pracownicy table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Dzień</TableCell>
                <TableCell align="center">Dzień tygodnia</TableCell>
                <TableCell align="center">Początek pracy</TableCell>
                <TableCell align="center">Koniec pracy</TableCell>
                <TableCell align="center">Ilość godzin</TableCell>
                <TableCell align="center">Edytuj</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workTimeTableRows.map((row) => (
                <StyledTableRowWorkTime key={row.id}>
                  <TableCell align="center">{row.day}</TableCell>
                  <TableCell align="center">{row.dayOfWeek}</TableCell>
                  <TableCell align="center">{row.startWork}</TableCell>
                  <TableCell align="center">{row.endWork}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      aria-label="edycja czasu pracy"
                      sx={{ width: '7px', height: '7px' }}
                      onClick={() => handleTimeUpdateClick(row.id, row.isoTime)}
                    >
                      <AlarmIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRowWorkTime>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right" />
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  {workTime
                    && getTimeFromMinutes(totalWorkTimeInMinutes(workTime))}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default WorkTimeTable;
