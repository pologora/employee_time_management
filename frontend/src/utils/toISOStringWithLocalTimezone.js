export default (date) => {
  if (!date) return null;
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - timezoneOffset);
  return adjustedDate.toISOString();
};
