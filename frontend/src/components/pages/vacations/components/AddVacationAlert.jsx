/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pl } from 'date-fns/locale';
import {
  Box,
  CircularProgress,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import calculateDuration from '../../../../utils/calculateVacationDuration';
import './customDatePickerStyles.css';
import vacationTypes from '../../../../options/vacationTypes';
import toISOStringWithLocalTimezone from '../../../../utils/toISOStringWithLocalTimezone';

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const weekendClass = (date) => (isWeekend(date) ? 'weekend' : '');

export default function AddVacatonAlert({
  open,
  onClose,
  handleAddVacation,
  employees,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState(null);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [customVacationType, setCustomVacationType] = useState('');
  const isAcceptVacationButton = startDate
    && endDate
    && duration
    && (type?.label === 'inne' ? customVacationType : type)
    && activeEmployee;

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDuration(() => calculateDuration(start, end));
  };

  const clearState = () => {
    setStartDate(null);
    setEndDate(null);
    setDuration(0);
    setType(null);
    setActiveEmployee(null);
    setCustomVacationType('');
  };

  const handleDateSelection = () => {
    const { _id: id } = activeEmployee;
    const typeVacation = type.label === 'inne' ? customVacationType : type.label;
    const newVacationData = {
      startVacation: toISOStringWithLocalTimezone(startDate),
      endVacation: toISOStringWithLocalTimezone(endDate),
      duration,
      type: typeVacation,
      employeeId: id,
    };
    handleAddVacation(newVacationData);
    onClose();
    clearState();
  };

  const handleClose = () => {
    onClose();
    clearState();
  };

  const propsAutocompl = {
    options: employees,
    getOptionLabel: (option) => `${option.name} ${option.surname}`,
    isOptionEqualToValue: (option, value) => option._id === value._id,
  };

  const propsTypeVacation = {
    options: vacationTypes,
    getOptionLabel: (option) => (option ? option.label : ''),
  };

  return !employees ? (
    <CircularProgress />
  ) : (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Wybierz datę wolnego</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: 2,
            }}
          >
            <Autocomplete
              value={activeEmployee}
              onChange={(e, value) => {
                setActiveEmployee(value);
              }}
              {...propsAutocompl}
              disablePortal
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Wybierz pracownika" />
              )}
            />
            <Autocomplete
              value={type}
              onChange={(e, value) => {
                setType(value);
              }}
              {...propsTypeVacation}
              disablePortal
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Wybierz rodzaj wolnego" />
              )}
            />

            {type && type.label === 'inne' && (
              <TextField
                value={customVacationType}
                onChange={(e) => setCustomVacationType(e.target.value)}
                label="Wpisz własny rodzaj wolnego"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <DialogContentText
              sx={{ marginBottom: 1, color: 'black', fontWeight: 'bold' }}
            >
              {startDate?.toLocaleDateString()}
              {' - '}
              {endDate?.toLocaleDateString()}
            </DialogContentText>
            <DialogContentText
              sx={{
                marginBottom: 1,
                color: 'black',
                fontWeight: 'bold',
                marginRight: 15,
              }}
            >
              Wybrane dni:
              {' '}
              {duration}
            </DialogContentText>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: '',
              marginTop: 2,
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale={pl}
              dayClassName={weekendClass}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Powrót
          </Button>
          <Button
            onClick={handleDateSelection}
            variant="contained"
            disabled={!isAcceptVacationButton}
          >
            Wybierz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
