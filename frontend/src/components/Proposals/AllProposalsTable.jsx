import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import './Proposals.css';
import { AllProposalsTableRow } from './AllProposalsTableRow';

export function AllProposalsTable({ data }) {
  const rows = data.map((item) => <AllProposalsTableRow vacation={item} key={item._id} />);

  return (
    <div className="pendingProposalsTableContainer">
      <Typography variant="h4">Wnioski pracowników</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="proposals table">
          <TableHead>
            <TableRow>
              <TableCell>Imię nazwisko</TableCell>
              <TableCell>Początek</TableCell>
              <TableCell>Koniec</TableCell>
              <TableCell>Długość</TableCell>
              <TableCell>Rodzaj</TableCell>
              <TableCell>Stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
