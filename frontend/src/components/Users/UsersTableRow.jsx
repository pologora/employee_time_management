import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@emotion/styled';
import { getDayStringFromUtcFullDate, getRowColorByVacationType } from '../../helpers/helplers';

const StyledTableRowVacations = styled(TableRow)(() => ({
  '& > *': {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
}));

export function UsersTableRow({ user }) {
  return (
    <StyledTableRowVacations>
      <TableCell>
        {user.name}
        {' '}
        {user.surname}
      </TableCell>
      <TableCell>{getDayStringFromUtcFullDate(user.startVacation)}</TableCell>
      <TableCell>{getDayStringFromUtcFullDate(user.endVacation)}</TableCell>
      <TableCell>
        {user.duration}
        {' '}
        Dni
      </TableCell>
      <TableCell
        sx={{
          color: getRowColorByVacationType(user.type),
        }}
      >
        {user.type}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            color: '#8806CE',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#6C3082',
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
      </TableCell>
    </StyledTableRowVacations>

  );
}
