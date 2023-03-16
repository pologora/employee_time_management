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

export default function UpdateAlert({ open, onClose, employee }) {
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const { pin } = employee || {};
  const {
    post, get, isLoading, error, patch,
  } = useAxios();

  const updateEmployeeField = (name, value) => {
    setEmployeeToUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateEmployee = async () => {
    const loginUrl = 'https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/test-hbegu/auth/providers/local-userpass/login';
    const headersForLogin = {
      username: 'mail@mail.com',
      password: '6545248',
    };
    const accessToken = await post(loginUrl, headersForLogin);
    console.log(accessToken);
    const headersForUpdate = {
      Authorization: `Bearer ${accessToken.access_token}`,
    };
    const url = 'https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employee';
    await patch(url, employeeToUpdate, headersForUpdate);
  };
  const handleUpdate = () => {
    updateEmployee();
    onClose();
  };

  useEffect(() => {
    const getEmployeeByPin = async (employeePin) => {
      const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employee?pin=${employeePin}`;
      const employeeData = await get(url);
      setEmployeeToUpdate(employeeData);
    };
    getEmployeeByPin(pin);
  }, [pin]);

  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
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
              label="Name"
              value={employeeToUpdate?.name}
              onChange={(e) => updateEmployeeField('name', e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="surname"
              label="Surname"
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
              label="Vacation Days Per Year"
              value={employeeToUpdate?.vacationDaysPerYear}
              onChange={(e) => updateEmployeeField('vacationDaysPerYear', e.target.value)}
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
              <FormControlLabel value="Agencja" control={<Radio />} label="Agencja" />
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
