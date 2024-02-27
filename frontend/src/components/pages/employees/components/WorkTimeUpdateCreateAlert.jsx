import { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CircularProgress, DialogContent } from '@mui/material';
import { pl } from 'date-fns/locale';
import toISOStringWithLocalTimezone from '../../../../utils/toISOStringWithLocalTimezone';
import convertTimeStringISOToObject from '../../../../utils/convertTimeStringISOToObject';
import {
  createTime,
  deleteTime,
  getTimeById,
  updateTime,
} from '../../../../api/workTimeApi';

export default function WorkTimeUpdateCreateAlert({
  open,
  onClose,
  getEmployeeWorkTime,
  dayIsoTime,
  timeDocumentId,
  employeeId,
}) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkTimeDocument, setSelectedWorkTimeDocument] = useState(null);

  const isTimeValues = endTime && startTime;
  const isDocumentToDelete = startTime && timeDocumentId;

  const handleResetStates = () => {
    setStartTime(null);
    setEndTime(null);
    setSelectedWorkTimeDocument(null);
  };

  const handleTimeUpdate = async () => {
    try {
      if (!timeDocumentId) {
        await createTime(employeeId, startTime, endTime);
      } else {
        await updateTime(timeDocumentId, startTime, endTime);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      handleResetStates();
      getEmployeeWorkTime();
    }
  };

  const handleTimeDelete = async (id) => {
    try {
      await deleteTime(id);
      getEmployeeWorkTime();
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      handleResetStates();
    }
  };

  const handleCloseAlert = () => {
    onClose();
    handleResetStates();
  };

  const handleDeleteTimeClick = (id) => {
    handleTimeDelete(id);
    handleResetStates();
  };

  const createFullTimeString = (dayTimeIso, selectedTime) => {
    const hours = toISOStringWithLocalTimezone(selectedTime).slice(10);
    const day = dayTimeIso.slice(0, 10);
    return day + hours;
  };

  const handleTimeChange = useCallback(
    (name, date) => {
      let newTime = createFullTimeString(dayIsoTime, date);
      if (name === 'start') {
        setStartTime(newTime);
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
    const getSelectedTimeDocument = async (id) => {
      setIsLoading(true);
      try {
        const { data } = await getTimeById(id);
        setSelectedWorkTimeDocument(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (timeDocumentId) {
      getSelectedTimeDocument(timeDocumentId);
    }
  }, [timeDocumentId]);

  useEffect(() => {
    if (selectedWorkTimeDocument) {
      const { startWork, endWork } = selectedWorkTimeDocument;
      setStartTime(startWork);
      setEndTime(endWork);
    }
  }, [selectedWorkTimeDocument]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            height: '400px',
          },
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle>Wybierz czas</DialogTitle>
            <DialogContent>
              <DatePicker
                selected={
                  startTime ? convertTimeStringISOToObject(startTime) : null
                }
                onChange={(date) => handleTimeChange('start', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                locale={pl}
              />
              <DatePicker
                selected={
                  endTime ? convertTimeStringISOToObject(endTime) : null
                }
                onChange={(date) => handleTimeChange('end', date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                locale={pl}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDeleteTimeClick(timeDocumentId)}
                variant="outlined"
                color="error"
                disabled={!isDocumentToDelete}
              >
                Usuń
              </Button>
              <Button
                onClick={handleCloseAlert}
                variant="outlined"
                color="primary"
              >
                Powrót
              </Button>
              <Button
                onClick={handleTimeUpdate}
                disabled={!isTimeValues}
                color="secondary"
                variant="contained"
              >
                Zapisz
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
