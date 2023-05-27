import XLSX from 'xlsx';
import { Box, Button } from '@mui/material';
import SingleEmployeeRaport from './SingleEmployeeRaport';
import generateSingleEmplRaport from '../../../../utils/generateSingleEmplRaport';

function AllSntiRaport({ raport, raportRange }) {
  const [start, end] = raportRange;

  const raports = raport.map((item) => generateSingleEmplRaport(item, start, end));

  const generateExcel = (employees, filename) => {
    const wb = XLSX.utils.book_new();

    employees.forEach((employee) => {
      const {
        data, name, period, total,
      } = employee;

      const polishData = data.map((item) => ({
        Dzień: item.day,
        'Dzień tygodnia': item.dayOfWeek,
        'Godziny pracy': item.workHours,
        'Suma godzin': item.hoursCount,
      }));

      const titleAndHeaders = [
        ['Zakres', 'Imię i nazwisko', 'Stanowisko', null],
        [`${period}`, `${name}`, 'Specjalista ds. Logistyki', null],
        [null],
        ['Dzień', 'Dzień tygodnia', 'Godziny pracy', 'Łączny czas'],
      ];
      const wsTitleAndHeaders = XLSX.utils.aoa_to_sheet(titleAndHeaders);

      wsTitleAndHeaders['!cols'] = [
        { width: 30 }, // Column A: Dzień
        { width: 30 }, // Column B: Dzień tygodnia
        { width: 30 }, // Column C: Godziny pracy
        { width: 30 }, // Column D: Łączny czas
      ];

      XLSX.utils.sheet_add_json(wsTitleAndHeaders, polishData, {
        skipHeader: true,
        origin: 'A5',
      });

      const lastRowNumber = data.length + 5;
      XLSX.utils.sheet_add_aoa(wsTitleAndHeaders, [['Razem', total]], {
        origin: `C${lastRowNumber}`,
      });

      XLSX.utils.book_append_sheet(wb, wsTitleAndHeaders, `${name}`);
    });

    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleGenerateExcelClick = () => {
    const filename = `SNTI${start.slice(0, 10)}_${end.slice(0, 10)}`;
    generateExcel(raports, filename);
  };

  const raportsArrayElement = raport.map((employee) => (
    <SingleEmployeeRaport
      key={employee._id}
      employeeRaport={[employee]}
      raportRange={raportRange}
      isButton={false}
    />
  ));

  return (
    <div>
      <Box sx={{ margin: 4, textAlign: 'right' }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleGenerateExcelClick}
        >
          Excel
        </Button>
      </Box>
      {raportsArrayElement}
    </div>
  );
}
export default AllSntiRaport;
