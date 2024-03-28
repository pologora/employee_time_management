/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

export const createVacation = async (data) => {
  try {
    const url = '/vacations';
    const { data: response } = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteVacation = async (id) => {
  try {
    const url = `/vacations/${id}`;
    const { data: response } = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateVacation = async (vacation) => {
  try {
    const url = `/vacations/${vacation.id}`;
    const { data: response } = await axiosInstance.patch(url, vacation);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllVacationsOrByEmloyee = async (page, employeeId = '') => {
  try {
    const url = `/vacations?page=${page}&employeeId=${employeeId}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllVacationsByTimeAndType = async (data) => {
  try {
    const { start = '', end = '', type = '' } = data || {};
    const endpoint = start || end || type ? `?start=${start}&end=${end}&type=${type}` : '';
    const url = `/vacations/${endpoint}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVacationById = async (id) => {
  try {
    const url = `/vacations/${id}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateLastYearVacationLeftDays = async (days, id) => {
  try {
    const url = '/lastYearVacations';
    const data = { employeeId: id, daysLeft: days };
    const { data: response } = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLastYearVacationDaysLeft = async () => {
  try {
    const url = '/lastYearVacations';
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
