import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
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
  const { get, error, post } = useAxios();
  const {
    employee: { name, pin },
    startDate,
    endDate,
  } = selectedEmployee;

  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  const getSelectedTimeDocument = async (id) => {
    const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/worktime?id=${id}`;
    const workDocument = await get(url);
    // alert
    if (!error) {
      setSelectedWorkTimeDocument(workDocument);
    }
  };

  const createTime = async (employeePin, startWork, endWork) => {
    const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/worktime?pin=${employeePin}&startWork=${startWork}&endWork=${endWork}`;
    const res = await post(url);
    console.log(res);
    // alert
  };

  const updateTime = async (id, startWork, endWork) => {
    const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/worktime/update?id=${id}&startWork=${startWork}&endWork=${endWork}`;

    const res = await post(url);
    console.log(res);
    // alert
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

  const handleTimeUpdate = (id, startWork, endWork) => {
    if (!id) {
      createTime(pin, startWork, endWork);
    } else {
      updateTime(id, startWork, endWork);
    }
    getEmployeeWorkTime();
  };

  const emptyErray = createCalendarArray(startDate, endDate);

  const workHoursDataArray = workTime?.map((workDocument) => {
    const { _id, startWork, endWork } = workDocument;
    const dayStartWork = new Date(startWork).getDate();

    let totalTimeInMinutes;
    if (endWork) {
      // eslint-disable-next-line max-len
      totalTimeInMinutes = (new Date(endWork).getTime() - new Date(startWork).getTime()) / (1000 * 60);
    } else {
      totalTimeInMinutes = (new Date().getTime() - new Date(startWork).getTime()) / (1000 * 60);
    }

    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = Math.floor(totalTimeInMinutes % 60);
    const totalTime = `${hours}g ${minutes}m`;

    return {
      id: _id,
      day: dayStartWork,
      totalTimeWork: totalTime,
      startWork,
      endWork,
    };
  });

  const workTimeTableRows = emptyErray.map((dayData) => {
    const workHoursData = workHoursDataArray?.filter((workHours) => workHours.day === dayData.day);
    const { isoTime } = dayData;
    if (workHoursData && workHoursData.length > 0) {
      const totalTimeInMinutes = workHoursData.reduce((acc, curr) => {
        const { startWork } = curr;
        const endWork = curr.endWork ? curr.endWork : new Date();
        return acc + (new Date(endWork).getTime() - new Date(startWork).getTime()) / (1000 * 60);
      }, 0);

      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const total = `${hours}h ${minutes}min`;

      const start = new Date(workHoursData[0].startWork).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const end = workHoursData[workHoursData.length - 1].endWork
        ? new Date(workHoursData[workHoursData.length - 1].endWork).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
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
      <WorkTimeUpdateCreateAlert
        open={isOpenUpdateCreateWorkTime}
        onClose={handleUpdateTimeAlertClose}
        onTimeSelected={handleTimeUpdate}
        selectedWorkTimeDocument={selectedWorkTimeDocument}
        dayIsoTime={selectedDayIsoTime}
      />
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
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default WorkTimeTable;
