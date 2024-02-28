/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

export const createEmployee = async (data) => {
  try {
    const url = '/employees';
    const { data: response } = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEmployeeById = async (id) => {
  try {
    const url = `/employees/${id}`;
    const { data: response } = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateEmployeeById = async (id, employeeToUpdate) => {
  try {
    const url = `/employees/${id}`;
    console.log(employeeToUpdate);
    const { data: response } = await axiosInstance.patch(url, employeeToUpdate);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmployeeByPin = async (employeePin) => {
  try {
    const url = `/employees?pin=${employeePin}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWorkingEmployees = async () => {
  try {
    const url = '/employees?isWorking=true';
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const url = '/employees';
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSntiEmployees = async () => {
  try {
    const url = '/employees?isSnti=true';
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
