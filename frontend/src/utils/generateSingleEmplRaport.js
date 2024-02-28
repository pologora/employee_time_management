import calculateHolidays from './calculateHolidays';
import createCalendarArray from './createCalendarArray';
import getTimeFromMinutes from './getTimeFromMinutes';
import oneDocumentTotalTimeInMinutes from './timeOperations/oneDocumentTotalTimeInMinutes';

export default (data, startDate, endDate) => {
  const startD = new Date(`${startDate}`.slice(0, 19));
  const endD = new Date(`${endDate}`.slice(0, 19));
  endD.setHours(23, 59, 59);

  const calendar = createCalendarArray(startD, endD);

  const totalMonthWorkTime = getTimeFromMinutes(data?.totalWorkHours);

  const currentYear = new Date().getFullYear(); // Get the current year
  const holidays = calculateHolidays(currentYear); // Calculate holidays for the year

  const reportData = calendar.map((item) => {
    const { day, isoTime, dayOfWeek } = item;
    const dayIso = isoTime.slice(0, 10);

    let workHoursOrVacation = '--------';
    let workHoursId = null;
    let start = '';
    let end = '';
    let hoursCount = null;

    const workingDay = data?.workhours.filter(
      (workDoc) => workDoc.startWork.slice(0, 10) === dayIso,
    );

    if (workingDay && workingDay.length > 0) {
      workHoursId = workingDay[0].id;
      start = workingDay[0].startWork.slice(11, 16);
      end = workingDay[workingDay.length - 1].endWork?.slice(11, 16) || '';

      const totalTimeInMinutes = workingDay.reduce((acc, curr) => {
        const { startWork, endWork } = curr;
        const minutesWork = oneDocumentTotalTimeInMinutes(startWork, endWork);
        return acc + Math.round(minutesWork);
      }, 0);

      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      hoursCount = `${hours}h ${minutes}min`;

      workHoursOrVacation = `${start} - ${end}`;
    }

    // Create a Date object from the ISO string
    const dateObj = new Date(dayIso);

    // Format the day to 'mm-dd'
    const formattedDay = `${`0${dateObj.getMonth() + 1}`.slice(
      -2,
    )}-${`0${dateObj.getDate()}`.slice(-2)}`;

    // Check if the day is a holiday
    if (holidays.includes(formattedDay)) {
      return {
        day,
        dayOfWeek,
        workHours: workHoursOrVacation,
        hoursCount,
        id: workHoursId,
        isoTime: dayIso,
      };
    }

    const vacationDay = data?.vacations.find((vacation) => {
      const startVacation = new Date(vacation.startVacation);
      const endVacation = new Date(vacation.endVacation);
      const currentDay = new Date(dayIso);

      startVacation.setHours(0, 0, 0, 0);
      endVacation.setHours(23, 0, 0, 0);

      return currentDay >= startVacation && currentDay <= endVacation;
    });

    if (vacationDay) {
      if (dayOfWeek !== 'sob.' && dayOfWeek !== 'niedz.') {
        if (workingDay && workingDay.length > 0) {
          workHoursOrVacation += ` !! ${vacationDay.type}`;
        } else {
          workHoursOrVacation = vacationDay.type;
        }
      }
    }

    return {
      day,
      dayOfWeek,
      workHours: workHoursOrVacation,
      hoursCount,
      id: workHoursId,
      isoTime: dayIso,
    };
  });

  return {
    data: reportData,
    total: totalMonthWorkTime,
    name: `${data?.name} ${data?.surname}`,
    period: `${new Date(startDate).toLocaleDateString()} - ${new Date(
      endDate,
    ).toLocaleDateString()}`,
  };
};
