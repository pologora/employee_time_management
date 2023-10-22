import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';

function DeleteModal({
  open, close, agencyTitle, deleteAgency,
}) {
  const handleDeleteClick = () => {
    deleteAgency();
    close();
  };
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Czy napewno chcesz usunąć agencje:
          <Typography component="span" color="primary" ml={2}>
            {agencyTitle}
          </Typography>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClick} color="error" variant="outlined">
          Usuń
        </Button>
        <Button onClick={close} autoFocus variant="contained">
          Powrót
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteModal;
