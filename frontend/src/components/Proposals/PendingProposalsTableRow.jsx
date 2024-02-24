import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SettingsIcon from '@mui/icons-material/Settings';

import styled from '@emotion/styled';
import { useState } from 'react';
import { getDayStringFromUtcFullDate, getRowColorByVacationType } from '../../helpers/helplers';
import SubmitProposalAlert from './SubmitProposalAlert';

const StyledTableRowVacations = styled(TableRow)(() => ({
  '& > *': {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
}));

export function PendingProposalsTableRow({ vacation, refetch }) {
  const [isOpenAddVacationAlert, setIsOpenAddVacationAlert] = useState(false);
  const handleUpdateClick = () => {
    setIsOpenAddVacationAlert(true);
  };
  return (
    <>
      { isOpenAddVacationAlert && (
      <SubmitProposalAlert
        vacation={vacation}
        open={isOpenAddVacationAlert}
        onClose={setIsOpenAddVacationAlert}
        refetch={refetch}
      />
      )}
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
    </>

  );
}
