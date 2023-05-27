import baseUrl from '../options/baseUrl';
import useAxios from '../hooks/useAxios';

const { post, deleteItem, get } = useAxios();

export const createEmployee = async (data) => {
  const url = `${baseUrl}/employees`;
  const response = await post(url, data);
  return response;
};

export const deleteEmployeeById = async (id) => {
  const url = `${baseUrl}/employee?id=${id}`;
  const response = await deleteItem(url);
  return response;
};

export const updateEmployee = async (employeeToUpdate) => {
  const url = `${baseUrl}/employeeUpdate`;
  const response = await post(url, employeeToUpdate);
  return response;
};

export const getEmployeeByPin = async (employeePin) => {
  const url = `${baseUrl}/employee?pin=${employeePin}`;
  const response = await get(url);
  return response;
};

export const getWorkingEmployees = async () => {
  const url = `${baseUrl}/employees/isWorking`;
  const response = await get(url);
  return response;
};

export const getEmployees = async () => {
  const url = `${baseUrl}/employees`;
  const response = await get(url);
  return response;
};
