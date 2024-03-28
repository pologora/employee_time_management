/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

import toISOStringWithLocalTimezone from '../utils/toISOStringWithLocalTimezone';

export const createTime = async (id, startWork, endWork) => {
  // should change date string to format like: 2024-02-01T15:30:00
  const start = startWork.slice(0, 19);
  const end = endWork.slice(0, 19);

  try {
    const newDocument = { id, startWork: start, endWork: end };
    const url = '/worktime';

    const { data: response } = await axiosInstance.post(url, newDocument);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTime = async (id, startWork, endWork) => {
  // should change date string to format like: 2024-02-01T15:30:00
  const start = startWork.slice(0, 19);
  const end = endWork.slice(0, 19);

  try {
    const newDocument = { startWork: start, endWork: end };
    const url = `/worktime/${id}`;

    const { data: response } = await axiosInstance.patch(url, newDocument);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTime = async (id) => {
  try {
    const url = `/worktime/${id}`;

    const { data: response } = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTimeById = async (id) => {
  try {
    const url = `/worktime/${id}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmployeeWorkTimeByDate = async (id, startDate, endDate) => {
  try {
    const url = `/worktime?id=${id}&startDate=${toISOStringWithLocalTimezone(
      startDate,
    )}&endDate=${toISOStringWithLocalTimezone(endDate)}`;

    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
