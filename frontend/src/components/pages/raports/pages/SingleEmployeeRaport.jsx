import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import createCalendarArray from '../../../../utils/createCalendarArray';
import getTimeFromMinutes from '../../../../utils/getTimeFromMinutes';

const StyledTableRow = styled(TableRow)(() => ({
  '& > *': {
    padding: 0,
    paddingLeft: '10px',
  },
}));

const generateRaport = (data, startDate, endDate) => {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const calendar = createCalendarArray(startD, endD);

  const totalMonthWorkTime = getTimeFromMinutes(data?.totalWorkHours);

  const reportData = calendar.map((item) => {
    const { day, isoTime, dayOfWeek } = item;
    const dayIso = isoTime.slice(0, 10);

    let start = '';
    let end = '';
    let hoursCount = null;
    let workHoursOrVacation = '--------';

    const workingDay = data?.workhours.find(
      (workDoc) => workDoc.startWork.slice(0, 10) === dayIso,
    );

    if (workingDay) {
      const { startWork, endWork, total } = workingDay;
      start += startWork.slice(11, 16);
      end += endWork.slice(11, 16);
      workHoursOrVacation = `${start} - ${end}`;
      hoursCount = getTimeFromMinutes(total);
    }

    const vacationDay = data?.vacations.find((vacation) => {
      const startVacation = new Date(vacation.startVacation);
      const endVacation = new Date(vacation.endVacation);
      const currentDay = new Date(dayIso);

      return currentDay >= startVacation && currentDay <= endVacation;
    });

    if (vacationDay) {
      if (dayOfWeek !== 'sob.' && dayOfWeek !== 'niedz.') {
        if (workingDay) {
          workHoursOrVacation += ` !! ${vacationDay.type}`;
        } else {
          workHoursOrVacation = vacationDay.type;
        }
      }
    }

    return {
      day,
      dayOfWeek,
      workHours: workHoursOrVacation,
      hoursCount,
    };
  });
  return {
    data: reportData,
    total: totalMonthWorkTime,
    name: `${data?.name} ${data?.surname}`,
    period: `${new Date(startDate).toLocaleDateString()} - ${new Date(
      endDate,
    ).toLocaleDateString()}`,
  };
};

function SingleEmployeeRaport({ employeeRaport, raportRange }) {
  const [employee] = employeeRaport;
  const [startDate, endDate] = raportRange;

  const reportData = generateRaport(employee, startDate, endDate);

  console.log(reportData);

  return !employeeRaport ? (
    <CircularProgress />
  ) : (
    <div>
      <Box
        sx={{
          display: 'flex',
          gap: 10,
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Box>
          <Typography variant="h6">Zakres</Typography>
          <Typography variant="h5">{reportData.period}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Imię i nazwisko</Typography>
          <Typography variant="h5">{reportData.name}</Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dzień</TableCell>
              <TableCell>Dzień tygodnia</TableCell>
              <TableCell>Godziny pracy</TableCell>
              <TableCell>Ilość Godzin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.data.map((row) => (
              <StyledTableRow key={row.day}>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.dayOfWeek}</TableCell>
                <TableCell>{row.workHours}</TableCell>
                <TableCell>{row.hoursCount}</TableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Razem:
              </TableCell>
              <TableCell colSpan={2} align="right" />
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                {reportData.total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ margin: 4, textAlign: 'right' }}>
        <Button variant="contained" color="success">
          Excel
        </Button>
      </Box>
    </div>
  );
}
export default SingleEmployeeRaport;
