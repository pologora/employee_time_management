// calculateDuration.js
function calculateDuration(startDate, endDate) {
  let duration = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
      duration += 1;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return duration;
}

export default calculateDuration;
