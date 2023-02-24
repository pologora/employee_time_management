const VACATION_TYPES = ['wypoczynkowy', 'na żądanie'];

exports.calculateVacationDays = (startDay, endDay, typeOfLeave) => {
  let vacationDaysUsed = 0;
  const start = new Date(startDay);
  const end = new Date(endDay);
  const oneDay = 1000 * 60 * 60 * 24;
  const daysBetween = Math.round((end - start) / oneDay);

  if (VACATION_TYPES.includes(typeOfLeave)) {
    for (let i = 0; i < daysBetween; i++) {
      const currentDate = new Date(start.getTime() + i * oneDay);
      const dayOfAWeek = currentDate.getDay();
      if (dayOfAWeek !== 0 && dayOfAWeek !== 6) {
        vacationDaysUsed += 1;
      }
    }
  }
  return vacationDaysUsed;
};
