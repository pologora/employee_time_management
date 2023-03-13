import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';

const StyledTableRowWorkTime = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '2px !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function WorkTimeTable({ workTime, handleChangeComponentToRender, selectedEmployee }) {
  const handleAllEmployeesClick = () => {
    handleChangeComponentToRender('home');
  };

  const createCalendarArray = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const emptyErray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
      return {
        id: day,
        startWork: null,
        endWork: null,
        total: null,
        day,
        dayOfWeek,
      };
    });
    return emptyErray;
  };

  const emptyErray = createCalendarArray();

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
      };
    }

    return dayData;
  });

  return (
    <Box>
      <Button onClick={handleAllEmployeesClick}>Wszyscy pracownicy</Button>
      <Typography variant="h4">{`${selectedEmployee.name}`}</Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="Pracownicy table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Dzień</TableCell>
              <TableCell align="center">Dzień tygodnia</TableCell>
              <TableCell align="center">Początek pracy</TableCell>
              <TableCell align="center">Koniec pracy</TableCell>
              <TableCell align="center">Ilość godzin</TableCell>
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
              </StyledTableRowWorkTime>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default WorkTimeTable;
