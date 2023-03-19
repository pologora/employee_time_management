import { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, DialogContent } from '@mui/material';

export default function WorkTimeUpdateCreateAlert({
  open,
  onClose,
  onTimeSelected,
  selectedWorkTimeDocument,
  dayIsoTime,
}) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [idWorkTimeDoc, setIdWorkTimeDoc] = useState(null);
  const isTimeValues = endTime && startTime;

  const handleResetStates = () => {
    setStartTime(null);
    setEndTime(null);
    setIdWorkTimeDoc(null);
  };

  const handleDateSelection = () => {
    onTimeSelected(idWorkTimeDoc, startTime, endTime);
    onClose();
    handleResetStates();
  };

  const handleCloseAlert = () => {
    onClose();
    handleResetStates();
  };

  const createFullTimeString = (dayTimeIso, selectedTime) => {
    const hours = selectedTime.toISOString().slice(10);
    const day = dayTimeIso.slice(0, 10);
    return day + hours;
  };

  const handleTimeChange = useCallback(
    (name, date) => {
      let newTime = createFullTimeString(dayIsoTime, date);
      if (name === 'start') {
        setStartTime(newTime);
        if (endTime && new Date(newTime) >= new Date(endTime)) {
          const nextDay = new Date(dayIsoTime);
          nextDay.setDate(nextDay.getDate() + 1);
          const nextDayTime = createFullTimeString(nextDay.toISOString(), date);
          setEndTime(nextDayTime);
        }
      } else if (name === 'end') {
        if (startTime && new Date(newTime) <= new Date(startTime)) {
          const nextDay = new Date(dayIsoTime);
          nextDay.setDate(nextDay.getDate() + 1);
          newTime = createFullTimeString(nextDay.toISOString(), date);
        }
        setEndTime(newTime);
      }
    },
    [dayIsoTime, startTime, endTime],
  );

  useEffect(() => {
    if (selectedWorkTimeDocument) {
      const { startWork, endWork, _id: id } = selectedWorkTimeDocument;
      setStartTime(startWork);
      setEndTime(endWork);
      setIdWorkTimeDoc(id);
    }
  }, [selectedWorkTimeDocument]);

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Wybierz czas</DialogTitle>
        <DialogContent>
          <DatePicker
            selected={startTime ? new Date(startTime) : null}
            onChange={(date) => handleTimeChange('start', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="HH:mm"
          />
          <DatePicker
            selected={endTime ? new Date(endTime) : null}
            onChange={(date) => handleTimeChange('end', date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="HH:mm"
          />
          <Box sx={{ height: '200px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} variant="outlined" color="error">
            Powrót
          </Button>
          <Button onClick={handleDateSelection} disabled={!isTimeValues} variant="contained">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
