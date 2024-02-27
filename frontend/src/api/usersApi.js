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

export const getUserById = async (id) => {
  try {
    const url = `/users/${id}`;
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const url = `/users/${id}`;
    const { data } = await axiosInstance.delete(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserById = async (id, data) => {
  try {
    const url = `/users/${id}`;
    const { data: response } = await axiosInstance.patch(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
