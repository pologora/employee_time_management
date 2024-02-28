import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import styled from '@emotion/styled';
// import { IconButton } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getDayStringFromUtcFullDate, getProposalStatus, getRowColorByVacationType } from '../../helpers/helplers';

const StyledTableRowVacations = styled(TableRow)(() => ({
  '& > *': {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
}));

export function AllProposalsTableRow({ vacation }) {
  const { fullTitle, color } = getProposalStatus(vacation.status);

  return (
    <StyledTableRowVacations>
      <TableCell>
        {vacation.name}
        {' '}
        {vacation.surname}
      </TableCell>
      <TableCell>{getDayStringFromUtcFullDate(vacation.created_at)}</TableCell>
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
      <TableCell sx={{ color }}>
        {fullTitle}
      </TableCell>

    </StyledTableRowVacations>

  );
}
