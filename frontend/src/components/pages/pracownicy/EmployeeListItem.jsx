import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';

function EmployeeListItem({ employee }) {
  const {
    name, surname, isWorking, pin,
  } = employee;

  return (
    <ListItem disablePadding>
      <ListItemIcon>{isWorking && <EngineeringIcon color="success" />}</ListItemIcon>
      <ListItemText primary={`${name} ${surname}`} secondary={`PIN: ${pin}`} />
    </ListItem>
  );
}
export default EmployeeListItem;
