import { List } from '@mui/material';
import AgancyListItem from './AgencyListItem';

function AgenciesList({ agencies, handleClickOpen }) {
  const agencyRenderedList = agencies?.map((agency) => (
    <AgancyListItem
      key={agency.name}
      agency={agency}
      handleClickOpen={handleClickOpen}
    />
  ));
  return <List>{agencyRenderedList}</List>;
}
export default AgenciesList;
