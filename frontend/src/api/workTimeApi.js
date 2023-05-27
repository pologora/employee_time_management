import useAxios from '../hooks/useAxios';
import baseUrl from '../options/baseUrl';
import toISOStringWithLocalTimezone from '../utils/toISOStringWithLocalTimezone';

const { post, deleteItem, get } = useAxios();

export const createTime = async (id, startWork, endWork) => {
  const url = `${baseUrl}/worktime?id=${id}&startWork=${startWork}&endWork=${endWork}`;
  const response = post(url);
  return response;
};

export const updateTime = async (id, startWork, endWork) => {
  const url = `${baseUrl}/worktime/update?id=${id}&startWork=${startWork}&endWork=${endWork}`;
  const response = post(url);
  return response;
};

export const deleteTime = async (id) => {
  const url = `${baseUrl}/worktime?id=${id}`;
  const response = await deleteItem(url);
  return response;
};

export const getTimeById = async (id) => {
  const url = `${baseUrl}/worktime?id=${id}`;
  const response = await get(url);
  return response;
};

export const getEmployeeWorkTimeByDate = async (id, startDate, endDate) => {
  const url = `${baseUrl}/employee/worktime?id=${id}&startDate=${toISOStringWithLocalTimezone(
    startDate,
  )}&endDate=${toISOStringWithLocalTimezone(endDate)}`;

  const response = await get(url);
  return response;
};
