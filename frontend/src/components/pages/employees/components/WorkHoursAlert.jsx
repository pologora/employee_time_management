import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, DialogContent, DialogContentText } from '@mui/material';

export default function WorkHoursAlert({
  open, onClose, employee, onDateRangeSelected,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateSelection = () => {
    onDateRangeSelected({ employee, startDate, endDate });
    onClose();
  };

  const handleThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    setStartDate(startOfMonth);
    setEndDate(now);
  };

  const handleLastMonth = () => {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    setStartDate(startOfLastMonth);
    setEndDate(endOfLastMonth);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Wybierz date</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 1, color: 'black', fontWeight: 'bold' }}>
            {startDate.toLocaleDateString()}
            {' - '}
            {endDate?.toLocaleDateString()}
          </DialogContentText>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: '',
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <DialogActions
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
                marginLeft: '10px',
              }}
            >
              <Button onClick={handleThisMonth} variant="outlined" sx={{ marginLeft: '8px' }}>
                Bierzący misiąc
              </Button>
              <Button onClick={handleLastMonth} variant="outlined" sx={{}}>
                Poprzedni miesiąc
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">
            Powrót
          </Button>
          <Button onClick={handleDateSelection} variant="contained">
            Wybierz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
