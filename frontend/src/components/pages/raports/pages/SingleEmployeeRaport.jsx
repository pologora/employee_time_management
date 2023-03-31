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
import XLSX from 'xlsx';
import generateSingleEmplRaport from '../../../../utils/generateSingleEmplRaport';

const StyledTableRow = styled(TableRow)(() => ({
  '& > *': {
    padding: 0,
    paddingLeft: '10px',
  },
}));

function SingleEmployeeRaport({ employeeRaport, raportRange, isButton }) {
  const [employee] = employeeRaport;
  const [startDate, endDate] = raportRange;

  const reportData = generateSingleEmplRaport(employee, startDate, endDate);

  const generateExcel = (data, title, filename, total) => {
    const polishData = data.map((item) => ({
      Dzień: item.day,
      'Dzień tygodnia': item.dayOfWeek,
      'Godziny pracy': item.workHours,
      'Suma godzin': item.hoursCount,
    }));
    const titleAndHeaders = [
      [`${title}`, null, null, null],
      ['Dzień', 'Dzień tygodnia', 'Godziny pracy', 'Suma godzin'],
    ];
    const wsTitleAndHeaders = XLSX.utils.aoa_to_sheet(titleAndHeaders);

    wsTitleAndHeaders['!cols'] = [
      { width: 10 }, // Column A: Dzień
      { width: 20 }, // Column B: Dzień tygodnia
      { width: 20 }, // Column C: Godziny pracy
      { width: 15 }, // Column D: Suma godzin
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
