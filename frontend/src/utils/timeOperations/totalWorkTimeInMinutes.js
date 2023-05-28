export default (workTimeData) => {
  const totalWorkMinutes = workTimeData.reduce(
    (total, { startWork, endWork }) => {
      const startTime = new Date(startWork);
      const endTime = endWork ? new Date(endWork) : new Date();

      if (!endWork) {
        const timezoneOffset = startTime.getTimezoneOffset();
        endTime.setMinutes(endTime.getMinutes() - timezoneOffset);
      }

      const totalTimeInMinutes = Math.round(
        (endTime - startTime) / (1000 * 60),
      );
      return total + totalTimeInMinutes;
    },
    0,
  );
  return totalWorkMinutes;
};
