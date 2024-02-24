import axiosInstance from '../options/axiosInstance';

/* eslint-disable no-console */

export const login = async (email, password) => {
  try {
    const url = '/users/login';

    const body = { email, password };
    const { data } = await axiosInstance.post(url, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
