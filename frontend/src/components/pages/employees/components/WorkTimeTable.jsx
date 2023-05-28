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
import WorkTimeUpdateCreateAlert from './WorkTimeUpdateCreateAlert';

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
  } = selectedEmployee;
  const [selectedDayIsoTime, setSelectedDayIsoTime] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [timeDocumentId, setTimeDocumentId] = useState(null);

  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  function getHours(hoursCount) {
    if (hoursCount) {
      const [hoursStr] = hoursCount.split(' ');
      const hours = parseInt(hoursStr, 10);
      return hours;
    }
    return null;
  }

  const handleTimeUpdateClick = (id, isoTime) => {
    setTimeDocumentId(id);
    setSelectedDayIsoTime(isoTime);
    setisOpenUpdateCreateWorkTime(true);
  };

  const handleUpdateTimeAlertClose = () => {
    setisOpenUpdateCreateWorkTime(false);
  };

  const workTimeTableRows = workTime.data.map((dayData) => {
    const {
      day,
      dayOfWeek,
      workHours,
      hoursCount: total,
      id,
      isoTime,
    } = dayData;

    if (workHours && total) {
      const [startTime, endTime] = workHours.split(' - ');

      if (startTime && endTime) {
        return {
          id,
          startWork: startTime,
          endWork: endTime,
          total,
          day,
          dayOfWeek,
          isoTime,
        };
      }
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
      <Typography variant="h5">{`Zakres dat: ${workTime.period}`}</Typography>
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
              <StyledTableRowWorkTime key={row.day}>
                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.dayOfWeek}</TableCell>
                <TableCell align="center">
                  {row.startWork || row.workHours}
                </TableCell>
                <TableCell align="center">{row.endWork}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: `${getHours(row?.total) >= 12 && 'red'}`,
                  }}
                >
                  {row.total || row.hoursCount}
                </TableCell>
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
                {workTime.total}
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
