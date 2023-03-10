import { ListItem, ListItemText } from '@mui/material';

function EmpoyeeActiveListItem({ employee }) {
  const { name, surname, startWork } = employee;

  const getTimePassed = () => {
    const now = new Date();
    const start = new Date(startWork);
    const diff = now - start;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formatHours = (hoursPassed) => {
      if (hoursPassed === 1) {
        return `${hoursPassed} godzina`;
      }
      if (hoursPassed > 1 && hoursPassed < 5) {
        return `${hoursPassed} godziny`;
      }
      return `${hoursPassed} godzin`;
    };

    const formatMinutes = (minutesPassed) => {
      if (minutesPassed === 1) {
        return `${minutesPassed} minuta`;
      }
      if (minutesPassed > 1 && minutesPassed < 5) {
        return `${minutesPassed} minuty`;
      }
      return `${minutesPassed} minut`;
    };

    const hoursString = formatHours(hours);
    const minutesString = formatMinutes(remainingMinutes);

    return `Pracuje od godziny ${start.toLocaleTimeString()} (${hoursString} ${minutesString})`;
  };
  return (
    <ListItem disablePadding>
      <ListItemText primary={`${name} ${surname}`} secondary={getTimePassed()} />
    </ListItem>
  );
}
export default EmpoyeeActiveListItem;
