import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { PendingProposalsTableRow } from './PendingProposalsTableRow';
import './Proposals.css';

export function PendingProposalsTable({ data, refetch }) {
  const rows = data.map((item) => <PendingProposalsTableRow vacation={item} key={item._id} refetch={refetch} />);
  return (
    <div className="pendingProposalsTableContainer">
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
