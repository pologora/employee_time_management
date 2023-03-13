import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar, Checkbox, TextField, Toolbar, Typography,
} from '@mui/material';
import useAxios from '../../../../hooks/useAxios';

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
  const { error, post } = useAxios();

  const [pin, setDifaultPin] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isSnti, setIsSnti] = useState(false);

  const [isActiveAddButton, setIsActiveAddButton] = useState(false);

  const dataForRequest = {
    name,
    surname,
    pin,
    isSnti,
  };

  const addEmployee = async (data) => {
    const url = 'https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employees';
    const response = await post(url, data);
    getEmployees();
    if (response) {
      alert('Employee added successfully');
    } else {
      alert(error);
    }
  };
  const handleClearForm = () => {
    setName('');
    setSurname('');
    setIsSnti(false);
    setDifaultPin('');
    setOpen(false);
  };

  const handleAddEmployee = () => {
    addEmployee(dataForRequest);
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
        Dodać pracownika
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                SNTI
              </Typography>
              <Checkbox checked={isSnti} onChange={(e) => setIsSnti(e.target.checked)} />
            </Box>
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
