export default (startDate, endDate) => {
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = startDate.getDate();
  const lastDay = endDate ? endDate.getDate() : daysInMonth;

  const calendarArray = Array.from(
    { length: lastDay - firstDay + 1 },
    (_, i) => {
      const day = firstDay + i;
      const date = new Date(year, month, day);
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date - timezoneOffset)
        .toISOString()
        .slice(0, -5);
      const isoTime = `${localISOTime}Z`;
      const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
      return {
        id: day,
        startWork: null,
        endWork: null,
        total: null,
        day,
        dayOfWeek,
        isoTime,
        date,
      };
    },
  );
  return calendarArray;
};
