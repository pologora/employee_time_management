import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteAlert({
  onDelete, open, onClose, employee,
}) {
  const handleDelete = () => {
    onDelete(employee);
    onClose();
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Usunąć pracownika?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{employee?.name}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            powrót
          </Button>
          <Button onClick={handleDelete} color="error">
            usuń
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
