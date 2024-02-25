import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@emotion/styled';

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
      <TableCell>
        {user.email}
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
