import calculateHolidays from './calculateHolidays';

function calculateDuration(startDate, endDate) {
  let duration = 0;
  const currentDate = new Date(startDate);
  const year = currentDate.getFullYear();
  const holidays = calculateHolidays(year);

  while (currentDate <= endDate) {
    const dateString = `${`0${currentDate.getMonth() + 1}`.slice(
      -2,
    )}-${`0${currentDate.getDate()}`.slice(-2)}`;
    if (
      currentDate.getDay() !== 6
      && currentDate.getDay() !== 0
      && !holidays.includes(dateString)
    ) {
      duration += 1;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return duration;
}

export default calculateDuration;
