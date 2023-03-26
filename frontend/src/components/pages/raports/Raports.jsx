import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import baseUrl from '../../../options/baseUrl';
import AllEmployeesTable from './AllEmployeesTable';
import SelectOptions from './components/SelectOptions';

function Raporty() {
  const [selectedComponent, setselectedComponent] = useState('home');
  const [allEmployeesAgencja, setAllEmployeesAgencja] = useState(null);
  const { get } = useAxios();

  const getAllEmployeesAgencja = async (startDate, endDate) => {
    const url = `${baseUrl}/raports?startDate=${startDate}&endDate=${endDate}`;
    const data = await get(url);
    setAllEmployeesAgencja(data);
    console.log(data);
  };

  const handleAllAgencjaGenerate = (startDate, endDate) => {
    getAllEmployeesAgencja(startDate, endDate);
    setselectedComponent('home');
  };

  let componentToRender;
  switch (selectedComponent) {
    case 'home':
      componentToRender = (
        <SelectOptions handleAllAgencjaGenerate={handleAllAgencjaGenerate} />
      );
      break;
    case 'allEmloyees':
      componentToRender = <AllEmployeesTable employees={allEmployeesAgencja} />;
      break;
    default:
      componentToRender = <SelectOptions />;
      break;
  }

  return <div>{componentToRender}</div>;
}
export default Raporty;
