import baseUrl from '../options/baseUrl';
import useAxios from '../hooks/useAxios';

const { get } = useAxios();

export const getAllAgencjaRaport = async (startDate, endDate) => {
  const url = `${baseUrl}/raports?startDate=${startDate}&endDate=${endDate}`;
  const response = get(url);
  return response;
};

export const getEmployeeRaportByIdAndDate = async (id, startDate, endDate) => {
  const url = `${baseUrl}/raports/employeeId?employeeId=${id}&startDate=${startDate}&endDate=${endDate}`;
  const response = await get(url);
  return response;
};

export const getAllSntiRaport = async (startDate, endDate) => {
  const url = `${baseUrl}/raports/snti?startDate=${startDate}&endDate=${endDate}`;
  const response = await get(url);
  return response;
};
