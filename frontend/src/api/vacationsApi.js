import baseUrl from '../options/baseUrl';
import useAxios from '../hooks/useAxios';

const { post, get, deleteItem } = useAxios();

export const createVacation = async (data) => {
  const url = `${baseUrl}/vacations`;
  const response = await post(url, data);
  return response;
};

export const deleteVacation = async (id) => {
  const url = `${baseUrl}/vacations?id=${id}`;
  const response = await deleteItem(url);
  return response;
};

export const updateVacation = async (vacation) => {
  const url = `${baseUrl}/vacations/update?id=${vacation.id}`;
  const response = await post(url, vacation);
  return response;
};

export const getAllVacationsOrByEmloyee = async (page, employeeId = '') => {
  const url = `${baseUrl}/vacations?page=${page}&employeeId=${employeeId}`;
  const response = await get(url);
  return response;
};

export const getAllVacationsByTimeAndType = async (data) => {
  const { start = '', end = '', type = '' } = data || {};
  const endpoint = start || end || type ? `?start=${start}&end=${end}&type=${type}` : '';
  const url = `${baseUrl}/vacations/time${endpoint}`;
  const response = await get(url);
  return response;
};

export const getVacationById = async (id) => {
  const url = `${baseUrl}/vacations/id?id=${id}`;
  const response = get(url);
  return response;
};

export const updateLastYearVacationLeftDays = async (days, id) => {
  const url = `${baseUrl}/vacationsLastYear?employeeId=${id}&daysLeft=${days}`;
  const response = post(url);
  return response;
};

export const getLastYearVacationDaysLeft = async () => {
  const url = `${baseUrl}/vacationsLastYear`;
  const response = get(url);
  return response;
};
