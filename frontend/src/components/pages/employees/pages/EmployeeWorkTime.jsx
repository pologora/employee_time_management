import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import WorkTimeTable from '../components/WorkTimeTable';
import baseUrl from '../../../../options/baseUrl';
import toISOStringWithLocalTimezone from '../../../../utils/toISOStringWithLocalTimezone';

function EmployeeWorkTime({ selectedEmployee, handleChangeComponentToRender }) {
  const { isLoading, error, get } = useAxios();
  const [workTime, setWorkTime] = useState(null);
  const {
    employee: { id },
    startDate,
    endDate,
  } = selectedEmployee;

  const getEmployeeWorkTime = async () => {
    const url = `${baseUrl}/employee/worktime?id=${id}&startDate=${toISOStringWithLocalTimezone(
      startDate,
    )}&endDate=${toISOStringWithLocalTimezone(endDate)}`;
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
