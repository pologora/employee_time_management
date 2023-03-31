import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import getTimeFromMinutes from '../../../../utils/getTimeFromMinutes';

const StyledTableRowEmployees = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: 0,
    paddingLeft: '10px',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function AllEmployeesTable({ employees, raportRange }) {
  const [totalWorkTime, setTotalWorkTime] = useState(null);

  const rows = employees?.map((employee) => {
    const { name, surname, totalWorkMinutes } = employee;

    return {
      name: `${name} ${surname}`,
      totalWorkTime: getTimeFromMinutes(totalWorkMinutes),
    };
  });

  const reportData = [...rows];

  const generateExcel = (data, title, filename, total) => {
    const polishData = data.map((item) => ({
      'Imię i nazwisko': item.name,
      'Ilość godzin': item.totalWorkTime,
    }));
    const titleAndHeaders = [
      [`${title}`, null, null, null],
      ['Imię i nazwisko', 'Ilość godzin'],
    ];
    const wsTitleAndHeaders = XLSX.utils.aoa_to_sheet(titleAndHeaders);

    wsTitleAndHeaders['!cols'] = [
      { width: 30 }, // Column A: Dzień
      { width: 30 }, // Column B: Dzień tygodnia
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_json(wsTitleAndHeaders, polishData, {
      skipHeader: true,
      origin: 'A3',
    });

    const lastRowNumber = data.length + 3;
    XLSX.utils.sheet_add_aoa(wsTitleAndHeaders, [['Razem', total]], {
      origin: `A${lastRowNumber}`,
    });

    XLSX.utils.book_append_sheet(wb, wsTitleAndHeaders, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleGenerateExcelClick = () => {
    const data = reportData;
    const start = new Date(raportRange[0])?.toLocaleDateString();
    const end = new Date(raportRange[1])?.toLocaleDateString();
    const total = totalWorkTime;

    const title = `Wszyscy pracownicy agencja ${start} - ${end}`;
    const filename = title.replaceAll(' ', '');
    generateExcel(data, title, filename, total);
  };

  useEffect(() => {
    const totalMinutesAllEmployees = employees?.reduce(
      (acc, item) => acc + item.totalWorkMinutes,
      0,
    );
    setTotalWorkTime(getTimeFromMinutes(totalMinutesAllEmployees));
  }, [employees]);

  return !employees ? (
    <CircularProgress />
  ) : (
    <Box sx={{ marginTop: 4 }}>
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
          <Typography variant="h5">
            {new Date(raportRange[0])?.toLocaleDateString()}
            {' - '}
            {new Date(raportRange[1])?.toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="Pracownicy table">
          <TableHead>
            <TableRow>
              <TableCell>Imię i nazwisko</TableCell>
              <TableCell align="left">Ilość godzin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRowEmployees key={`${row.name}${row.surname}`}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.totalWorkTime}</TableCell>
              </StyledTableRowEmployees>
            ))}
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Razem:
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                {totalWorkTime}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ margin: 4, textAlign: 'right' }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleGenerateExcelClick}
        >
          Excel
        </Button>
      </Box>
    </Box>
  );
}

export default AllEmployeesTable;
