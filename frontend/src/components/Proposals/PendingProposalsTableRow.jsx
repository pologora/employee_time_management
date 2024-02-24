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

export function PendingProposalsTableRow({ vacation }) {
  const handleUpdateClick = (vacation) => {
    console.log(vacation);
  };
  return (

    <StyledTableRowVacations>
      <TableCell>
        {vacation.name}
        {' '}
        {vacation.surname}
      </TableCell>
      <TableCell>{getDayStringFromUtcFullDate(vacation.startVacation)}</TableCell>
      <TableCell>{getDayStringFromUtcFullDate(vacation.endVacation)}</TableCell>
      <TableCell>
        {vacation.duration}
        {' '}
        Dni
      </TableCell>
      <TableCell
        sx={{
          color: getRowColorByVacationType(vacation.type),
        }}
      >
        {vacation.type}
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
          onClick={() => handleUpdateClick(vacation)}
        >
          <SettingsIcon />
        </IconButton>
      </TableCell>
    </StyledTableRowVacations>

  );
}
