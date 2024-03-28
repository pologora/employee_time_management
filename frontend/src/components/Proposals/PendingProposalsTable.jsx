import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { useState } from 'react';
import { PendingProposalsTableRow } from './PendingProposalsTableRow';
import './Proposals.css';
import SubmitProposalAlert from './SubmitProposalAlert';

export function PendingProposalsTable({ data, refetch }) {
  const [isOpenAddVacationAlert, setIsOpenAddVacationAlert] = useState(false);
  const [activeProposal, setActiveProposal] = useState(null);

  const handleUpdateClick = (vacation) => {
    setActiveProposal(vacation);
    setIsOpenAddVacationAlert(true);
  };

  const rows = data.map((item) => (
    <PendingProposalsTableRow
      vacation={item}
      key={item._id}
      handleUpdateClick={handleUpdateClick}
    />
  ));

  return (
    <div className="pendingProposalsTableContainer">
      { isOpenAddVacationAlert && activeProposal && (
      <SubmitProposalAlert
        vacation={activeProposal}
        open={isOpenAddVacationAlert}
        onClose={() => setIsOpenAddVacationAlert(false)}
        refetch={refetch}
      />
      )}
      <Typography variant="h4">Wnioski do akceptacji</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="proposals table">
          <TableHead>
            <TableRow>
              <TableCell>Imię nazwisko</TableCell>
              <TableCell>Początek</TableCell>
              <TableCell>Koniec</TableCell>
              <TableCell>Długość</TableCell>
              <TableCell>Rodzaj</TableCell>
              <TableCell>Akcja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
