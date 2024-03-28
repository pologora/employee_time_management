import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useNotificationContext } from '../../../contexts/notificationContext';
import { sendUserCreationEmail } from '../../../api/authApi';

export function SendEmailAlert({
  employee, open, setOpen,
}) {
  const { handleChangeNotification } = useNotificationContext();
  const [isLoading, setIsLoading] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const sendSuccessNotification = () => {
    const message = { text: 'Mail został wysłany' };
    handleChangeNotification(message);
  };

  const sendErrorNotification = () => {
    const message = { text: 'Mail nie został wysłany', severity: 'error' };
    handleChangeNotification(message);
  };

  const sendRegistrationEmail = async () => {
    try {
      setIsLoading(true);
      const newUser = {
        email: employee.email,
        employeeId: employee.id,
      };
      await sendUserCreationEmail(newUser);
      sendSuccessNotification();
    } catch (error) {
      sendErrorNotification();
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleAcceptButton = async () => {
    await sendRegistrationEmail();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!employee) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Rejestracja nowego użytkownika
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {` ${employee.name}`}
        </Typography>
        <Typography variant="body1">
          {` ${employee.email}`}
        </Typography>
        <br />
        <DialogContentText id="alert-dialog-description">
          Chcesz wysłać maila do rejestracji użytkownika?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Powrót</Button>
        <Button onClick={handleAcceptButton} autoFocus variant="contained">
          Wysłać email
        </Button>
      </DialogActions>
    </Dialog>
  );
}
