import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import WorkTimeTable from './WorkTimeTable';

function WorkTime() {
  const pin = '101';
  const { isLoading, error, get } = useAxios();
  const [workTime, setWorkTime] = useState(null);

  const getEmployeeWorkTime = async () => {
    const url = `https://eu-central-1.aws.data.mongodb-api.com/app/test-hbegu/endpoint/employee/worktime?pin=${pin}`;
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

  return <div>{isLoading ? <CircularProgress /> : <WorkTimeTable workTime={workTime} />}</div>;
}
export default WorkTime;
