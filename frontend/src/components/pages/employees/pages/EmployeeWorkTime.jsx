import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import WorkTimeTable from '../components/WorkTimeTable';
import baseUrl from '../../../../options/baseUrl';

function EmployeeWorkTime({ selectedEmployee, handleChangeComponentToRender }) {
  const { isLoading, error, get } = useAxios();
  const [workTime, setWorkTime] = useState(null);
  const {
    employee: { id },
    startDate,
    endDate,
  } = selectedEmployee;

  function toISODate(date) {
    return date.toISOString().slice(0, 10);
  }

  const getEmployeeWorkTime = async () => {
    const url = `${baseUrl}/employee/worktime?id=${id}&startDate=${toISODate(
      startDate,
    )}&endDate=${toISODate(endDate)}`;
    const data = await get(url);
    if (data) {
      setWorkTime(data);
    }
    if (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getEmployeeWorkTime();
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <WorkTimeTable
          selectedEmployee={selectedEmployee}
          workTime={workTime}
          handleChangeComponentToRender={handleChangeComponentToRender}
          getEmployeeWorkTime={getEmployeeWorkTime}
        />
      )}
    </div>
  );
}
export default EmployeeWorkTime;
