/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pl } from 'date-fns/locale';
import {
  Box,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './customDatePickerStyles.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import calculateDuration from '../../utils/calculateVacationDuration';
import vacationTypes from '../../options/vacationTypes';
import { vacationsProposalsStatusTypes } from '../../options/proposalsTypes';
import { convertTimePickerDateToIsoString } from '../../helpers/convertTimePickerDateToIsoString';
import { rejectProposalById, updateProposalById } from '../../api/proposalsApi';
import { useNotificationContext } from '../../contexts/notificationContext';
import { createVacation } from '../../api/vacationsApi';

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const weekendClass = (date) => (isWeekend(date) ? 'weekend' : '');

export default function SubmitProposalAlert({
  open,
  onClose,
  vacation,
  refetch,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState(null);
  const [customVacationType, setCustomVacationType] = useState('');
  const [description, setDescription] = useState('');
  const { handleChangeNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  const proposalMutation = useMutation({
    mutationFn: (values) => updateProposalById(vacation._id, values),
    onSuccess: async () => {
      const message = {
        text: 'Wniosek został zaakceptowany',
      };
      handleChangeNotification(message);
      await refetch();
    },
    onError: () => {
      const message = {
        text: 'Nie udało się zaakceptować',
        severity: 'error',
      };
      handleChangeNotification(message);
    },
  });

  const vacationMutation = useMutation({
    mutationFn: (values) => createVacation(values),
    onError: () => {
      const message = {
        text: 'Nie udało się utworzyć dokumentu',
        severity: 'error',
      };
      handleChangeNotification(message);
    },
  });

  const proposalRejectMutation = useMutation({
    mutationFn: (id) => rejectProposalById(id),
    onSuccess: () => {
      const message = {
        text: 'Wniosek został Odrzucony!',
        severity: 'warning',
      };
      handleChangeNotification(message);
      queryClient.invalidateQueries({ queryKey: ['pendingProposals'] });
    },
    onError: () => {
      const message = {
        text: 'Nie udało się odrzucić wniosku',
        severity: 'error',
      };
      handleChangeNotification(message);
    },
  });

  const updateProposalAndCreateVacation = async (vacationData) => {
    proposalMutation.mutate(vacationData);
    vacationMutation.mutate(vacationData);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDuration(() => calculateDuration(start, end));
  };

  const setActiveVacation = (vacationActive) => {
    if (vacationActive) {
      const {
        startVacation,
        endVacation,
        type: vacationType,
        duration: durationDays,
        description,
      } = vacationActive;

      setStartDate(new Date(startVacation));
      setEndDate(new Date(endVacation));
      setDuration(durationDays);

      const customType = vacationTypes.find(
        (item) => item.label === vacationType,
      );

      if (!customType) {
        setCustomVacationType(vacationType);
        setType(vacationTypes.find((item) => item.label === 'inne'));
      } else {
        setType(customType);
      }

      if (description) {
        setDescription(description);
        setCustomVacationType(description);
      }
    }
  };

  useEffect(() => {
    setActiveVacation(vacation);
  }, [vacation]);

  const handleAccept = () => {
    const typeVacation = type.label === 'inne' ? customVacationType : type.label;
    const newVacationData = {
      startVacation: convertTimePickerDateToIsoString(startDate),
      endVacation: convertTimePickerDateToIsoString(endDate),
      duration,
      type: typeVacation,
      status: vacationsProposalsStatusTypes.approved,
      description,
      employeeId: vacation.employeeId,
    };
    updateProposalAndCreateVacation(newVacationData);
    onClose();
  };

  const handleReject = () => {
    proposalRejectMutation.mutate(vacation._id);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const propsTypeVacation = {
    options: vacationTypes,
    getOptionLabel: (option) => (option ? option.label : ''),
  };

  return (

    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{`${vacation.name} ${vacation.surname}`}</DialogTitle>
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

            {((type && type.label === 'inne') || description) && (
              <TextField
                value={customVacationType}
                onChange={(e) => setCustomVacationType(e.target.value)}
                label="Wpisz własny rodzaj wolnego"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            )}

            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Dodatkowa informacja"
              variant="outlined"
              sx={{ width: '100%' }}
            />

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
          <Button onClick={handleAccept} variant="contained" color="primary">
            Akceptuj
          </Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
          >
            Odrzuć
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Powrót
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
