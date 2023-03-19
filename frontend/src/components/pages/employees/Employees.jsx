import { useState } from 'react';
import EmployeesHome from './pages/EmployeesHome';
import EmployeeWorkTime from './pages/EmployeeWorkTime';

function Employees() {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [selectedEmployee, setSelectedEmployee] = useState({
    employee: {},
    startDate: '',
    endDate: '',
  });

  const handleChangeComponentToRender = (component) => {
    setSelectedComponent(component);
  };

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = (
        <EmployeesHome
          setSelectedEmployee={setSelectedEmployee}
          handleChangeComponentToRender={handleChangeComponentToRender}
        />
      );
      break;
    case 'workTime':
      componentToRender = (
        <EmployeeWorkTime
          selectedEmployee={selectedEmployee}
          handleChangeComponentToRender={handleChangeComponentToRender}
        />
      );
      break;
    default:
      componentToRender = <EmployeesHome />;
      break;
  }
  return <div>{componentToRender}</div>;
}
export default Employees;
