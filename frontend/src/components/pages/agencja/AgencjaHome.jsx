import {
  Box, Button, CircularProgress, Grid, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useEffect, useState } from 'react';
import { getAgencies } from '../../../api/agenciesApi';

import AgenciesList from './AgenciesList';
import AgenciesSettingsModal from './AgenciesSettingsModal';

function AgencjaHome() {
  const [agencies, setAgencies] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [activeAgency, setActiveAgency] = useState(null);

  const handleClickOpenSettings = (agency) => {
    setOpenSettings(true);
    setActiveAgency(agency);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleAddAgencyClick = () => {
    setOpenSettings(true);
    setActiveAgency(null);
  };

  const fetchAgencies = async () => {
    const data = await getAgencies();
    setAgencies(data.data);
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <Box>
      {openSettings && (
        <AgenciesSettingsModal
          open={openSettings}
          close={handleCloseSettings}
          agency={activeAgency}
          fetchAgencies={fetchAgencies}
        />
      )}

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleAddAgencyClick}
      >
        Dodaj agencje
      </Button>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Agencje
        </Typography>
        {agencies ? (
          <AgenciesList
            agencies={agencies}
            handleClickOpen={handleClickOpenSettings}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Box>
  );
}
export default AgencjaHome;
