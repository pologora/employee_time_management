import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { createEmployee } from '../../../../api/employeesApi';
import { useAgenciesContext } from '../../../../contexts/agenciesContext';
import { useEmployeesContext } from '../../../../contexts/employeeContext';
import getNextPin from '../../../../helpers/getNextPin';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  paddingTop: 10,
};

const closeModalBtnSx = {
  color: 'common.white',
  '&:hover': {
    cursor: 'pointer',
  },
};

const employeeInitialValue = {
  name: '',
  surname: '',
  pin: '',
  vacationDaysPerYear: 0,
  isSnti: false,
  agency: '',
};

export default function AddEmployee() {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(employeeInitialValue);
  const {
    name, surname, pin, vacationDaysPerYear, isSnti, agency,
  } = employee;
  const [isActiveAddButton, setIsActiveAddButton] = useState(false);
  const { agencies } = useAgenciesContext();
  const { employees, fetchEmployees } = useEmployeesContext();
  const title = 'Dodawanie pracownika';

  useEffect(() => {
    if (employees) {
      const pin = getNextPin(employees);
      setEmployee((prev) => ({ ...prev, pin }));
    }
  }, [employees]);

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    if (name === 'isSnti') {
      const isSnti = value === 'SNTI';
      if (isSnti) {
        setEmployee((prev) => ({ ...prev, agency: '' }));
      }
      return setEmployee((prev) => ({ ...prev, isSnti }));
    }
    return setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const addEmployee = async (data) => {
    try {
      await createEmployee(data);
      fetchEmployees();
      setOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClearForm = () => {
    setEmployee(employeeInitialValue);
  };

  const handleAddEmployee = () => {
    const data = { ...employee };
    if (data.agency && !data.isSnti) {
      data.agency = data.agency._id;
    } else {
      data.agency = '';
    }
    addEmployee(data);
    handleClearForm();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const active = name && surname && pin;
    setIsActiveAddButton(active);
  }, [surname, name, pin]);

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Dodaj pracownika
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <AppBar position="absolute" sx={{ width: '100%' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
              <CloseIcon onClick={handleClose} sx={closeModalBtnSx} />
            </Toolbar>
          </AppBar>
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
          >
            <TextField
              label="Imię"
              name="name"
              required
              variant="outlined"
              margin="dense"
              value={name}
              onChange={handleInputUpdate}
              autoFocus
            />
            <TextField
              label="Nazwisko"
              name="surname"
              variant="outlined"
              required
              margin="dense"
              value={surname}
              onChange={handleInputUpdate}
            />
            <TextField
              label="PIN"
              name="pin"
              variant="outlined"
              margin="dense"
              required
              value={pin}
              onChange={handleInputUpdate}
            />
            <TextField
              margin="dense"
              id="vacationDaysPerYear"
              name="vacationDaysPerYear"
              label="Dni wakacyjne w roku"
              value={vacationDaysPerYear}
              onChange={handleInputUpdate}
              fullWidth
              variant="standard"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroup
                row
                name="isSnti"
                aria-label="employee-type"
                value={isSnti ? 'SNTI' : 'Agencja'}
                onChange={handleInputUpdate}
              >
                <FormControlLabel
                  value="SNTI"
                  control={<Radio />}
                  label="SNTI"
                />
                <FormControlLabel
                  value="Agencja"
                  control={<Radio />}
                  label="Agencja"
                />
              </RadioGroup>
            </Box>
            {!isSnti ? (
              <Autocomplete
                disablePortal
                id="agencja"
                name="agency"
                options={agencies}
                getOptionLabel={(option) => option?.name || ''}
                value={agency || null} // Make sure it's either a valid option or null
                onChange={(_, newValue) => handleInputUpdate({
                  target: { name: 'agency', value: newValue },
                })}
                filterOptions={(options, { inputValue }) => options.filter((option) => option.name
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()))}
                renderInput={(params) => (
                  <TextField {...params} label="Agencja" />
                )}
              />
            ) : null}

            <Button
              variant="contained"
              color="primary"
              disabled={!isActiveAddButton}
              onClick={handleAddEmployee}
            >
              Dodać
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
