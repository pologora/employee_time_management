import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

import styled from '@emotion/styled';
import { getDayStringFromUtcFullDate, getProposalStatus } from '../../helpers/helplers';

const StyledTableRowVacations = styled(TableRow)(({ theme }) => ({
  '& > *': {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export function ProposalsListItem({ data }) {
  const { color, fullTitle } = getProposalStatus(data.status);

  // const row = {
  //   name: `${data.name} ${data.surname}`,
  //   duration: data.duration,
  //   color,
  //   status: fullTitle,
  //   type: data.type,
  //   createdAt: getDayStringFromUtcFullDate(data.created_at),
  //   fromTo: `${getDayStringFromUtcFullDate(data.startVacation)} - ${getDayStringFromUtcFullDate(data.endVacation)}`,
  // };

  return (

    data?.map((vacation) => (
      <StyledTableRowVacations key={vacation._id}>
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
            color: getRowColor(vacation.type),
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
    ))

  );
}
