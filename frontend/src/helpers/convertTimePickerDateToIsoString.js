export const convertTimePickerDateToIsoString = (date) => {
  const monthDayCharsLong = 2;
  const addedNumberToMonth = 1; // Month is zero-based, so add 1

  const year = date.getFullYear();
  const month = (date.getMonth() + addedNumberToMonth).toString().padStart(monthDayCharsLong, '0');
  const day = date.getDate().toString().padStart(monthDayCharsLong, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
};
