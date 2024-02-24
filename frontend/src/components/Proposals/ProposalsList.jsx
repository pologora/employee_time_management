import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { ProposalsListItem } from './ProposalsListItem';

export function ProposalsList({ data }) {
  const rows = data.map((item) => <ProposalsListItem data={item} key={item._id} />);
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
}
