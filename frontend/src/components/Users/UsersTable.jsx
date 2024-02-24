import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { UsersTableRow } from './UsersTableRow';

export function UsersTable({ data, refetch }) {
  const rows = data.map((item) => (
    <UsersTableRow
      user={item}
      key={item._id}
      refetch={refetch}
    />
  ));

  return (
    <div className="pendingProposalsTableContainer">
      <Typography variant="h4">Użytkownicy aplikacji</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="proposals table">
          <TableHead>
            <TableRow>
              <TableCell>Imię nazwisko</TableCell>
              <TableCell>Email</TableCell>
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
