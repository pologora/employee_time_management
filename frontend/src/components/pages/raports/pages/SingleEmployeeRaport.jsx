import styled from '@emotion/styled';
import AlarmIcon from '@mui/icons-material/Alarm';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import XLSX from 'xlsx';
import generateSingleEmplRaport from '../../../../utils/generateSingleEmplRaport';

const StyledTableRow = styled(TableRow)(() => ({
  '& > *': {
    padding: '2px',
    paddingLeft: '5px',
  },
}));

function SingleEmployeeRaport({
  employeeRaport,
  raportRange,
  isButton,
  openTimeEditModal,
}) {
  const [employee] = employeeRaport;
  const [startDate, endDate] = raportRange;
  const reportData = generateSingleEmplRaport(employee, startDate, endDate);

  const handleTimeUpdateClick = (id, dayIso) => {
    openTimeEditModal(id, dayIso, employee._id);
  };

  function getHours(hoursCount) {
    if (hoursCount) {
      const [hoursStr] = hoursCount.split(' ');
      const hours = parseInt(hoursStr, 10);
      return hours;
    }
    return null;
  }

  const generateExcel = (data, title, filename, total) => {
    const polishData = data.map((item) => ({
      Dzień: item.day,
      'Dzień tygodnia': item.dayOfWeek,
      'Godziny pracy': item.workHours,
      'Łączny czas': item.hoursCount,
    }));
    const titleAndHeaders = [
      [`${title}`, null, null, null],
      ['Dzień', 'Dzień tygodnia', 'Godziny pracy', 'Łączny czas'],
    ];
    const wsTitleAndHeaders = XLSX.utils.aoa_to_sheet(titleAndHeaders);

    wsTitleAndHeaders['!cols'] = [
      { width: 10 }, // Column A: Dzień
      { width: 20 }, // Column B: Dzień tygodnia
      { width: 20 }, // Column C: Godziny pracy
      { width: 15 }, // Column D: Łączny czas
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_json(wsTitleAndHeaders, polishData, {
      skipHeader: true,
      origin: 'A3',
    });

    const lastRowNumber = data.length + 3;
    XLSX.utils.sheet_add_aoa(wsTitleAndHeaders, [['Razem', total]], {
      origin: `C${lastRowNumber}`,
    });

    XLSX.utils.book_append_sheet(wb, wsTitleAndHeaders, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleGenerateExcelClick = () => {
    const {
      data, name, period, total,
    } = reportData;
    const title = `${name} ${period}`;
    const filename = title.replaceAll(' ', '');
    generateExcel(data, title, filename, total);
  };

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
              <TableCell align="center">Dzień</TableCell>
              <TableCell align="center">Dzień tygodnia</TableCell>
              <TableCell align="center">Godziny pracy</TableCell>
              <TableCell align="center">Ilość Godzin</TableCell>
              <TableCell align="center">Edytuj</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.data.map((row) => (
              <StyledTableRow key={row.day}>
                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.dayOfWeek}</TableCell>
                <TableCell align="center">{row.workHours}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: `${getHours(row?.hoursCount) > 10 && 'red'}`,
                  }}
                >
                  {row.hoursCount}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edycja czasu pracy"
                    sx={{ width: '6px', height: '6px' }}
                    onClick={() => handleTimeUpdateClick(row.id, row.dayIso)}
                  >
                    <AlarmIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}
              >
                Razem:
              </TableCell>
              <TableCell colSpan={2} />
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}
              >
                {reportData.total}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {isButton && (
        <Box sx={{ margin: 4, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleGenerateExcelClick}
          >
            Excel
          </Button>
        </Box>
      )}
    </div>
  );
}
export default SingleEmployeeRaport;
