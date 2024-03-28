import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BooleanAlert({
  open, setOpen, onAccept, title, content, acceptText, color = 'primary',
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => onAccept();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>powrót</Button>
        <Button onClick={handleAgree} autoFocus variant="contained" color={color}>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
