import { List } from '@mui/material';
import EmpoyeeActiveListItem from './EmpoyeeActiveListItem';

function EmployeeActiveList({ employees }) {
  const listItems = employees.map((employee) => (
    <EmpoyeeActiveListItem key={employee.pin} employee={employee} />
  ));
  return <List>{listItems}</List>;
}
export default EmployeeActiveList;
