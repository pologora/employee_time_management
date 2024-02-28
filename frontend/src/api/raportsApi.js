/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

export const getAllAgencjaRaport = async (startDate, endDate) => {
  // should change date string to format like: 2024-02-01T15:30:00
  const start = startDate.slice(0, 19);
  const end = endDate.slice(0, 19);
  try {
    const url = `/raports?startDate=${start}&endDate=${end}`;
    const response = axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmployeeRaportByIdAndDate = async (id, startDate, endDate) => {
  // should change date string to format like: 2024-02-01T15:30:00
  const start = startDate.slice(0, 19);
  const end = endDate.slice(0, 19);
  try {
    const url = `/raports/${id}?startDate=${start}&endDate=${end}`;
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSntiRaport = async (startDate, endDate) => {
  // should change date string to format like: 2024-02-01T15:30:00
  const start = startDate.slice(0, 19);
  const end = endDate.slice(0, 19);

  try {
    const url = `/raports/snti?startDate=${start}&endDate=${end}`;
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
