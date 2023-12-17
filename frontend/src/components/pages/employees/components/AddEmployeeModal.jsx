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
import { getAgencies } from '../../../../api/agenciesApi';

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

export default function AddEmployee({ employees, getEmployees }) {
  const [open, setOpen] = useState(false);
  const [pin, setDifaultPin] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isSnti, setIsSnti] = useState(false);
  const [vacationDaysPerYear, setVacationDaysPerYear] = useState(0);
  const [isActiveAddButton, setIsActiveAddButton] = useState(false);
  const [agency, setAgency] = useState(null);
  const [agenciesList, setAgenciesList] = useState(null);

  const dataForEmployeeCreation = {
    name,
    surname,
    pin,
    isSnti,
    vacationDaysPerYear,
    agency: agency?.id,
  };

  const getAllAgencies = async () => {
    const data = await getAgencies();
    const dataForAutocomplete = data?.map((item) => ({
      label: item.name,
      id: item._id,
    }));
    setAgenciesList(dataForAutocomplete);
  };

  useEffect(() => {
    getAllAgencies();
  }, []);

  const handleAgencyChange = (e, newValue) => {
    setAgency(newValue);
  };

  const addEmployee = async (data) => {
    try {
      createEmployee(data);
      getEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClearForm = () => {
    setName('');
    setSurname('');
    setIsSnti(false);
    setDifaultPin('');
    setOpen(false);
    setVacationDaysPerYear(0);
    setAgency(null);
  };

  const handleAddEmployee = () => {
    addEmployee(dataForEmployeeCreation);
    handleClearForm();
  };

  const findLastPin = () => {
    const biggestPin = employees.reduce((acc, item) => {
      let newAcc;
      if (item.pin > acc) {
        newAcc = item.pin;
      } else {
        newAcc = acc;
      }
      return newAcc;
    }, 0);
    const defaultPin = (+biggestPin + 1).toString();
    setDifaultPin(defaultPin);
  };

  const handleOpen = () => {
    findLastPin();
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
                Dodawanie pracownika
              </Typography>
              <CloseIcon onClick={handleClose} sx={closeModalBtnSx} />
            </Toolbar>
          </AppBar>
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
          >
            <TextField
              label="Imię"
              required
              variant="outlined"
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              label="Nazwisko"
              variant="outlined"
              required
              margin="dense"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              label="PIN"
              variant="outlined"
              margin="dense"
              required
              value={pin}
              onChange={(e) => setDifaultPin(e.target.value)}
            />
            <TextField
              margin="dense"
              id="vacationDaysPerYear"
              label="Dni wakacyjne w roku"
              value={vacationDaysPerYear}
              onChange={(e) => setVacationDaysPerYear(+e.target.value)}
              fullWidth
              variant="standard"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroup
                row
                aria-label="employee-type"
                defaultValue={isSnti ? 'SNTI' : 'Agencja'}
                value={isSnti ? 'SNTI' : 'Agencja'}
                onChange={(e) => setIsSnti(e.target.value === 'SNTI')}
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
                options={agenciesList || []}
                sx={{ marginBottom: 2 }}
                onChange={handleAgencyChange}
                value={agency}
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
