import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

function AgancyListItem({
  agency, handleClickOpen, isLoading, activeAgency,
}) {
  const {
    name, email, phone, contactPerson, _id: id,
  } = agency;

  const isAgencyOnChange = id === activeAgency?._id && isLoading;

  const handleSettingsClick = () => {
    handleClickOpen(agency);
  };

  const avatarChars = (agencyTitle) => {
    const agencyTitleCopy = agencyTitle.trim();
    const titleWorldsList = agencyTitleCopy.split(' ');
    if (titleWorldsList.length > 1) {
      const firstChar = titleWorldsList[0][0];
      const secondChar = titleWorldsList[1][0];
      if (secondChar) {
        return firstChar.toUpperCase() + secondChar.toUpperCase();
      }
    }
    return agencyTitle[0].toUpperCase() + agencyTitle[1];
  };

  return (
    <ListItem
      secondaryAction={
        !isAgencyOnChange ? (
          <IconButton
            edge="end"
            aria-label="settings"
            onClick={handleSettingsClick}
          >
            <SettingsIcon color="secondary" />
          </IconButton>
        ) : (
          <CircularProgress size={25} />
        )
      }
    >
      <ListItemAvatar>
        <Avatar>{avatarChars(name)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={contactPerson} />
      <ListItemText primary={email} />
      <ListItemText primary={phone} />
    </ListItem>
  );
}
export default AgancyListItem;
