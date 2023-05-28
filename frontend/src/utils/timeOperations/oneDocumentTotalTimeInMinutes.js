export default (startWork, endWork) => {
  const startTime = new Date(startWork);
  const endTime = endWork ? new Date(endWork) : new Date();

  // Get the timezone offset in minutes
  const timezoneOffset = startTime.getTimezoneOffset();

  // Adjust the start and end time by the timezone offset
  startTime.setMinutes(startTime.getMinutes() + timezoneOffset);

  const totalTimeInMinutes = Math.round((endTime - startTime) / (1000 * 60));
  return totalTimeInMinutes;
};
