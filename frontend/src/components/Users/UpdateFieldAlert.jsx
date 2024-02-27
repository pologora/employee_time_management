import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function FormDialog({
  open, setOpen, value, title, update, name,
}) {
  const [fieldValue, setFieldValue] = useState(value);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const data = { [name]: fieldValue };
    update(data);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {`Zmień ${title}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id={name}
          name={name}
          label={title}
          fullWidth
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button onClick={handleSubmit} variant="contained">Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
