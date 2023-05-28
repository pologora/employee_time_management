export default (startWork, endWork) => {
  const startTime = new Date(startWork);
  const endTime = endWork ? new Date(endWork) : new Date();

  // Get the timezone offset in minutes
  // Adjust the end time by the timezone offset
  if (!endWork) {
    const timezoneOffset = startTime.getTimezoneOffset();
    endTime.setMinutes(endTime.getMinutes() - timezoneOffset);
  }

  const totalTimeInMinutes = Math.round((endTime - startTime) / (1000 * 60));
  return totalTimeInMinutes;
};
