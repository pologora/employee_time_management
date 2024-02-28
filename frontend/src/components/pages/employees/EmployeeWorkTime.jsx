import { useEffect, useState } from 'react';
import WorkTimeTable from './WorkTimeTable';
import { getEmployeeRaportByIdAndDate } from '../../../api/raportsApi';
import generateSingleEmplRaport from '../../../utils/generateSingleEmplRaport';
import toISOStringWithLocalTimezone from '../../../utils/toISOStringWithLocalTimezone';

function EmployeeWorkTime({ selectedEmployee, handleChangeComponentToRender }) {
  const [workTime, setWorkTime] = useState(null);
  const {
    employee: { id },
    startDate,
    endDate,
  } = selectedEmployee;

  const getEmployeeWorkTime = async () => {
    try {
      const start = toISOStringWithLocalTimezone(startDate);
      const end = toISOStringWithLocalTimezone(endDate);
      const { data } = await getEmployeeRaportByIdAndDate(id, start, end);
      const [employee] = data.data;
      const reportData = generateSingleEmplRaport(employee, start, end);
      setWorkTime(reportData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getEmployeeWorkTime();
  }, []);

  return (
    <div>
      {workTime && (
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
