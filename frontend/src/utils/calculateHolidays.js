import calculateCorpusChristi from './calculateCorpusChristi';
import calculateEasterMonday from './calculateEasterMonday';

export default function calculateHolidays(year) {
  const holidays = [
    '01-01',
    '01-06',
    '05-01',
    '05-03',
    '08-15',
    '11-01',
    '11-11',
    '12-25',
    '12-26',
  ];

  const easterMonday = calculateEasterMonday(year);
  const courpusChristi = calculateCorpusChristi(`${year}-${easterMonday}`);

  holidays.push(easterMonday, courpusChristi);

  return holidays;
}
