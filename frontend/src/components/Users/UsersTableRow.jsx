import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
        {user.token ? 'Oczekuje na rejestracje' : 'Aktywny'}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="details"
          size="small"
          color="primary"
        >
          <Link to={`/users/${user._id}`} className="custom-link">
            <ArrowForwardRoundedIcon />
          </Link>
        </IconButton>
      </TableCell>
    </StyledTableRowVacations>

  );
}
