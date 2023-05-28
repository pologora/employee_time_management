import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
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
import getTimeFromMinutes from '../../../../utils/getTimeFromMinutes';
import totalWorkTimeInMinutes from '../../../../utils/timeOperations/totalWorkTimeInMinutes';
import oneDocumentTotalTimeInMinutes from '../../../../utils/timeOperations/oneDocumentTotalTimeInMinutes';

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
  const {
    employee: { name, id: employeeId },
    startDate,
    endDate,
  } = selectedEmployee;
  const [selectedDayIsoTime, setSelectedDayIsoTime] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [timeDocumentId, setTimeDocumentId] = useState(null);

  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  const handleTimeUpdateClick = (id, isoTime) => {
    if (id.length > 10) {
      setTimeDocumentId(id);
    } else {
      setTimeDocumentId(null);
    }
    setSelectedDayIsoTime(isoTime);
    setisOpenUpdateCreateWorkTime(true);
  };

  const handleUpdateTimeAlertClose = () => {
    setisOpenUpdateCreateWorkTime(false);
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
          employeeId={employeeId}
          dayIsoTime={selectedDayIsoTime}
          timeDocumentId={timeDocumentId}
          onClose={handleUpdateTimeAlertClose}
          getEmployeeWorkTime={getEmployeeWorkTime}
        />
      )}
      <Button onClick={handleAllEmployeesClick}>Wszyscy pracownicy</Button>
      <Typography variant="h4">{`${name}`}</Typography>
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
    </Box>
  );
}

export default WorkTimeTable;
