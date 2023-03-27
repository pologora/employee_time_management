export default (dateString) => {
  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart
    .slice(0, -1)
    .split(':')
    .map(Number);

  const localDateObject = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    seconds,
  );
  return localDateObject;
};
