import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: 0,
    paddingLeft: '10px',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function WorkTimeTable({ workTime }) {
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

    const start = new Date(startWork).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const end = endWork
      ? new Date(endWork).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : null;

    let totalTimeWork;
    if (endWork) {
      totalTimeWork = new Date(endWork).getTime() - new Date(startWork).getTime();
    } else {
      totalTimeWork = new Date().getTime() - new Date(startWork).getTime();
    }

    const getHoursAndMinutesString = (time) => {
      if (!time) return null;
      const hours = Math.floor(time / 1000 / 60 / 60);
      const min = Math.floor(time / 1000 / 60);
      return `${hours}h ${min}min`;
    };

    return {
      id: _id,
      day: dayStartWork,
      totalTimeWork: getHoursAndMinutesString(totalTimeWork),
      startWork: start,
      endWork: end,
    };
  });

  const workTimeTableRows = emptyErray.map((dayData) => {
    const workHoursData = workHoursDataArray?.find((workHours) => workHours.day === dayData.day);

    if (workHoursData) {
      return {
        id: workHoursData.id,
        startWork: workHoursData.startWork,
        endWork: workHoursData.endWork,
        total: workHoursData.totalTimeWork,
        day: workHoursData.day,
        dayOfWeek: dayData.dayOfWeek,
      };
    }
    return dayData;
  });
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="Pracownicy table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Dzień</TableCell>
            <TableCell align="center">Dzień tygodnia</TableCell>
            <TableCell align="center">Początek pracy</TableCell>
            <TableCell align="center">Koniec pracy</TableCell>
            <TableCell align="center">Ilość godzin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workTimeTableRows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell align="center">{row.day}</TableCell>
              <TableCell align="center">{row.dayOfWeek}</TableCell>
              <TableCell align="center">{row.startWork}</TableCell>
              <TableCell align="center">{row.endWork}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkTimeTable;
