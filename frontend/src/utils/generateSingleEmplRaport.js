import createCalendarArray from './createCalendarArray';
import getTimeFromMinutes from './getTimeFromMinutes';

export default (data, startDate, endDate) => {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const calendar = createCalendarArray(startD, endD);

  const totalMonthWorkTime = getTimeFromMinutes(data?.totalWorkHours);

  const reportData = calendar.map((item) => {
    const { day, isoTime, dayOfWeek } = item;
    const dayIso = isoTime.slice(0, 10);

    let start = '';
    let end = '';
    let hoursCount = null;
    let workHoursOrVacation = '--------';
    let workHoursId = null;

    const workingDay = data?.workhours.find(
      (workDoc) => workDoc.startWork.slice(0, 10) === dayIso,
    );

    if (workingDay) {
      const {
        startWork, endWork, total = 0, id,
      } = workingDay;
      workHoursId = id;
      start += startWork.slice(11, 16);
      end += endWork ? endWork.slice(11, 16) : '';
      workHoursOrVacation = `${start} - ${end}`;
      hoursCount = getTimeFromMinutes(total);
    }

    const vacationDay = data?.vacations.find((vacation) => {
      const startVacation = new Date(vacation.startVacation);
      const endVacation = new Date(vacation.endVacation);
      const currentDay = new Date(dayIso);

      return currentDay >= startVacation && currentDay <= endVacation;
    });

    if (vacationDay) {
      if (dayOfWeek !== 'sob.' && dayOfWeek !== 'niedz.') {
        if (workingDay) {
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
