import {
  Box, Button, CircularProgress, Grid, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';
import AgenciesList from './AgenciesList';
import AgenciesSettingsModal from './AgenciesSettingsModal';
import { useAgenciesContext } from '../../../contexts/agenciesContext';

function AgencjaHome() {
  const { agencies, fetchAgencies } = useAgenciesContext();
  const [openSettings, setOpenSettings] = useState(false);
  const [activeAgency, setActiveAgency] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Box>
      {openSettings && (
        <AgenciesSettingsModal
          open={openSettings}
          close={handleCloseSettings}
          agency={activeAgency}
          fetchAgencies={fetchAgencies}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
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
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            activeAgency={activeAgency}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Box>
  );
}
export default AgencjaHome;
