import { List } from '@mui/material';
import EmployeeListItem from './EmployeeListItem';

function EmployeeList({ employees }) {
  const employeesItem = employees.map((item) => <EmployeeListItem employee={item} />);

  return <List>{employeesItem}</List>;
}

export default EmployeeList;
