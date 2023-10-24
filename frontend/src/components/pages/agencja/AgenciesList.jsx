import { List } from '@mui/material';
import AgancyListItem from './AgencyListItem';

function AgenciesList({
  agencies, handleClickOpen, isLoading, activeAgency,
}) {
  const agencyRenderedList = agencies?.map((agency) => (
    <AgancyListItem
      key={agency.name}
      agency={agency}
      handleClickOpen={handleClickOpen}
      isLoading={isLoading}
      activeAgency={activeAgency}
    />
  ));
  return <List>{agencyRenderedList}</List>;
}
export default AgenciesList;
