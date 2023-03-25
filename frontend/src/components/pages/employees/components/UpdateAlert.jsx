/* eslint-disable max-len */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import useAxios from '../../../../hooks/useAxios';
import baseUrl from '../../../../options/baseUrl';

export default function UpdateAlert({
  open, onClose, employee, getEmployees,
}) {
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const { pin } = employee || {};
  const {
    get, isLoading, error, post,
  } = useAxios();

  const updateEmployeeField = (name, value) => {
    setEmployeeToUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateEmployee = async () => {
    const url = `${baseUrl}/employeeUpdate`;
    await post(url, employeeToUpdate);
    getEmployees();
  };
  const handleUpdate = () => {
    updateEmployee();
    onClose();
  };

  useEffect(() => {
    const getEmployeeByPin = async (employeePin) => {
      const url = `${baseUrl}/employee?pin=${employeePin}`;
      const employeeData = await get(url);
      setEmployeeToUpdate(employeeData);
    };
    getEmployeeByPin(pin);
  }, [pin]);

  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error));
    }
  }, [error]);

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Update Employee</DialogTitle>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Imię"
              value={employeeToUpdate?.name}
              onChange={(e) => updateEmployeeField('name', e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="surname"
              label="Nazwisko"
              value={employeeToUpdate?.surname}
              onChange={(e) => updateEmployeeField('surname', e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="pin"
              label="PIN"
              value={employeeToUpdate?.pin}
              onChange={(e) => updateEmployeeField('pin', e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="vacationDaysPerYear"
              label="Dni wakacyjne w roku"
              value={employeeToUpdate?.vacationDaysPerYear}
              onChange={(e) => updateEmployeeField('vacationDaysPerYear', +e.target.value)}
              fullWidth
              variant="standard"
            />
            <RadioGroup
              row
              aria-label="employee-type"
              defaultValue={employeeToUpdate?.isSnti ? 'SNTI' : 'Agencja'}
              value={employeeToUpdate?.isSnti ? 'SNTI' : 'Agencja'}
              onChange={(e) => updateEmployeeField('isSnti', e.target.value === 'SNTI')}
            >
              <FormControlLabel value="SNTI" control={<Radio />} label="SNTI" />
              <FormControlLabel
                value="Agencja"
                control={<Radio />}
                label="Agencja"
              />
            </RadioGroup>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={onClose}>Powrót</Button>
          <Button onClick={handleUpdate} color="secondary">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
