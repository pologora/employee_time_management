import { styled } from '@mui/material/styles';
import {
  Alert,
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
import useAxios from '../../../../hooks/useAxios';
import baseUrl from '../../../../options/baseUrl';
import severityOptions from '../../../../options/severityOptions';

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
    get, post, isLoading, deleteItem,
  } = useAxios();
  const {
    employee: { name, id: employeeId },
    startDate,
    endDate,
  } = selectedEmployee;
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState(severityOptions.SUCCESS);

  const showAlert = (message, severityOption) => {
    setAlertMessage(message);
    setSeverity(severityOption);
    setOpenAlert(true);
  };

  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  const getSelectedTimeDocument = async (id) => {
    const url = `${baseUrl}/worktime?id=${id}`;
    const workDocument = await get(url);
    if (!(workDocument instanceof Error)) {
      setSelectedWorkTimeDocument(workDocument);
    } else {
      showAlert(workDocument.message, severityOptions.ERROR);
    }
  };

  const createTime = async (id, startWork, endWork) => {
    const url = `${baseUrl}/worktime?id=${id}&startWork=${startWork}&endWork=${endWork}`;

    return post(url);
  };

  const updateTime = async (id, startWork, endWork) => {
    const url = `${baseUrl}/worktime/update?id=${id}&startWork=${startWork}&endWork=${endWork}`;

    return post(url);
  };

  const deleteTime = async (id) => {
    const url = `${baseUrl}/worktime?id=${id}`;

    return deleteItem(url);
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
    if (!id) {
      const result = await createTime(employeeId, startWork, endWork);
      if (!(result instanceof Error)) {
        showAlert('Dodałeś czas', severityOptions.SUCCESS);
      } else {
        showAlert(result.message, severityOptions.ERROR);
      }
    } else {
      const result = await updateTime(id, startWork, endWork);
      if (!(result instanceof Error)) {
        setAlertMessage();
        showAlert('Czas zaktualizowany', severityOptions.SUCCESS);
      } else {
        showAlert(result.message, severityOptions.ERROR);
      }
    }
    getEmployeeWorkTime();
  };

  const handleTimeDelete = async (id) => {
    const result = await deleteTime(id);
    if (!(result instanceof Error)) {
      showAlert('Czas usunięty', severityOptions.SUCCESS);
    } else {
      showAlert(result.message, severityOptions.ERROR);
    }
    getEmployeeWorkTime();
  };

  const emptyErray = createCalendarArray(startDate, endDate);

  const calculateTotalWorkTime = (workTimeData) => {
    const totalWorkMinutes = workTimeData?.reduce((acc, doc) => {
      const { startWork, endWork } = doc;
      let totalTimeInMinutes;
      if (endWork) {
        totalTimeInMinutes = Math.round(
          (new Date(endWork).getTime() - new Date(startWork).getTime())
            / (1000 * 60),
        );
      } else {
        totalTimeInMinutes = Math.round(
          (new Date().getTime() - new Date(startWork).getTime()) / (1000 * 60),
        );
      }
      return acc + totalTimeInMinutes;
    }, 0);
    const hours = Math.floor(totalWorkMinutes / 60);
    const minutes = Math.floor(totalWorkMinutes % 60);
    return `${hours}h ${minutes}min`;
  };

  const workHoursDataArray = workTime?.map((workDocument) => {
    const { _id, startWork, endWork } = workDocument;
    const dayStartWork = new Date(startWork).getDate();

    let totalTimeInMinutes;
    if (endWork) {
      totalTimeInMinutes = Math.round(
        (new Date(endWork).getTime() - new Date(startWork).getTime())
          / (1000 * 60),
      );
    } else {
      totalTimeInMinutes = Math.round(
        (new Date().getTime() - new Date(startWork).getTime()) / (1000 * 60),
      );
    }

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
    const workHoursData = workHoursDataArray?.filter(
      (workHours) => workHours.day === dayData.day,
    );
    const { isoTime } = dayData;
    if (workHoursData && workHoursData.length > 0) {
      const totalTimeInMinutes = workHoursData.reduce((acc, curr) => {
        const { startWork } = curr;
        const endWork = curr.endWork ? curr.endWork : new Date();
        return (
          acc
          + Math.round(
            (new Date(endWork).getTime() - new Date(startWork).getTime())
              / (1000 * 60),
          )
        );
      }, 0);

      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const total = `${hours}h ${minutes}min`;

      const start = workHoursData[0].startWork.slice(11, 16);

      const end = workHoursData[workHoursData.length - 1].endWork
        ? workHoursData[workHoursData.length - 1].endWork.slice(11, 16)
        : null;

      return {
        id: workHoursData[0].id,
        startWork: start,
        endWork: end,
        total,
        day: workHoursData[0].day,
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
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <WorkTimeUpdateCreateAlert
        open={isOpenUpdateCreateWorkTime}
        onClose={handleUpdateTimeAlertClose}
        onTimeSelected={handleTimeUpdate}
        selectedWorkTimeDocument={selectedWorkTimeDocument}
        dayIsoTime={selectedDayIsoTime}
        handleTimeDelete={handleTimeDelete}
      />
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
                <TableCell align="center">Redagowanie</TableCell>
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
                      aria-label="redagowanie czasu pracy"
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
                  {calculateTotalWorkTime(workTime)}
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
