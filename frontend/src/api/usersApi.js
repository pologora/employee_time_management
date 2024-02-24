/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

export const getAllUsers = async () => {
  try {
    const url = '/users';
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
