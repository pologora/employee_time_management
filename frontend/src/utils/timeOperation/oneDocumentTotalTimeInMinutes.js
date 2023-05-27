export default (startWork, endWork) => {
  const startTime = new Date(startWork);
  const endTime = endWork ? new Date(endWork) : new Date();
  const totalTimeInMinutes = Math.round((endTime - startTime) / (1000 * 60));
  return totalTimeInMinutes;
};
