import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import WorkTimeTable from '../components/WorkTimeTable';
import { getEmployeeWorkTimeByDate } from '../../../../api/workTimeApi';

function EmployeeWorkTime({ selectedEmployee, handleChangeComponentToRender }) {
  const [workTime, setWorkTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    employee: { id },
    startDate,
    endDate,
  } = selectedEmployee;

  const getEmployeeWorkTime = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployeeWorkTimeByDate(id, startDate, endDate);
      setWorkTime(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
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
