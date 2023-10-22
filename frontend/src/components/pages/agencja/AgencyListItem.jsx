import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

function AgancyListItem({ agency, handleClickOpen }) {
  const {
    name, email, phone, contactPerson,
  } = agency;

  const handleSettingsClick = () => {
    handleClickOpen(agency);
  };

  const avatarChars = (agencyTitle) => {
    const titleWorldsList = agencyTitle.split(' ');
    if (titleWorldsList.length > 1) {
      return (
        titleWorldsList[0][0].toUpperCase()
        + titleWorldsList[1][0].toUpperCase()
      );
    }
    return agencyTitle[0].toUpperCase() + agencyTitle[1];
  };

  return (
    <ListItem
      secondaryAction={(
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleSettingsClick}
        >
          <SettingsIcon color="secondary" />
        </IconButton>
      )}
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
