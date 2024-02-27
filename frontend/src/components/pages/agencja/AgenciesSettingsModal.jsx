import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import {
  createAgency,
  deleteAgency,
  updateAgency,
} from '../../../api/agenciesApi';

function AgenciesSettingsModal({
  open,
  close,
  agency,
  fetchAgencies,
  setIsLoading,
}) {
  const {
    name = '',
    email = '',
    _id: id = '',
    phone = '',
    contactPerson = '',
  } = agency || {};

  const [agencyData, setAgencyData] = useState({
    name,
    email,
    id,
    phone,
    contactPerson,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteAgency = async () => {
    close();
    setIsLoading(true);
    await deleteAgency(id);
    await fetchAgencies();
    setIsLoading(false);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleUpdateClick = async () => {
    setIsLoading(true);

    if (agency) {
      close();
      await updateAgency(agencyData);
    } else {
      close();
      await createAgency(agencyData);
    }
    await fetchAgencies();
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { id: title, value } = e.target;
    setAgencyData((prev) => ({ ...prev, [title]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {openDeleteModal && (
        <DeleteModal
          open={openDeleteModal}
          close={handleCloseDeleteModal}
          deleteAgency={handleDeleteAgency}
          agencyTitle={agencyData.name}
        />
      )}
      <DialogTitle id="alert-dialog-title">Edycja agencji</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleInputChange}
          value={agencyData.name}
          autoFocus
          margin="dense"
          id="name"
          label="Nazwa agencji"
          type="text"
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          value={agencyData.email}
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          value={agencyData.phone}
          margin="dense"
          id="phone"
          label="Telefon"
          type="text"
          fullWidth
        />
        <TextField
          onChange={handleInputChange}
          value={agencyData.contactPerson}
          margin="dense"
          id="contactPerson"
          label="Osoba do kontaktu"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        {agency && (
          <Button onClick={handleDeleteClick} color="error" variant="outlined">
            Usuń
          </Button>
        )}

        <Button onClick={close} autoFocus variant="outlined">
          Powrót
        </Button>
        <Button
          onClick={handleUpdateClick}
          color="secondary"
          variant="contained"
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AgenciesSettingsModal;
