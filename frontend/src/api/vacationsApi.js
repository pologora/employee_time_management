import axiosInstance from '../options/axiosInstance';

export const createVacation = async (data) => {
  const url = '/vacations';
  const { data: response } = await axiosInstance.post(url, data);
  return response;
};

export const deleteVacation = async (id) => {
  const url = `/vacations/${id}`;
  const { data: response } = await axiosInstance.delete(url);
  return response;
};

export const updateVacation = async (vacation) => {
  const url = `/vacations/${vacation.id}`;
  const { data: response } = await axiosInstance.patch(url, vacation);
  return response;
};

export const getAllVacationsOrByEmloyee = async (page, employeeId = '') => {
  const url = `/vacations?page=${page}&employeeId=${employeeId}`;
  const { data: response } = await axiosInstance.get(url);
  return response;
};

export const getAllVacationsByTimeAndType = async (data) => {
  const { start = '', end = '', type = '' } = data || {};
  const endpoint = start || end || type ? `?start=${start}&end=${end}&type=${type}` : '';
  const url = `/vacations/${endpoint}`;
  const { data: response } = await axiosInstance.get(url);
  return response;
};

export const getVacationById = async (id) => {
  const url = `/vacations/${id}`;
  const { data: response } = await axiosInstance.get(url);
  return response;
};

export const updateLastYearVacationLeftDays = async (days, id) => {
  const url = '/lastYearVacations';
  const data = { employeeId: id, daysLeft: days };
  const { data: response } = await axiosInstance.post(url, data);
  return response;
};

export const getLastYearVacationDaysLeft = async () => {
  const url = '/lastYearVacations';
  const { data: response } = await axiosInstance.get(url);
  return response;
};
