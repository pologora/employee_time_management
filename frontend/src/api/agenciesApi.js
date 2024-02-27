/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';

export const createAgency = async (data) => {
  try {
    const url = '/agencies';
    const { data: response } = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAgency = async (id) => {
  try {
    const url = `/agencies/${id}`;
    const { data: response } = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAgency = async (agencyToUpdate) => {
  console.log(agencyToUpdate);
  try {
    const url = `/agencies/${agencyToUpdate.id}`;
    const { data: response } = await axiosInstance.patch(url, agencyToUpdate);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAgencies = async () => {
  try {
    const url = '/agencies';
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAgencyByID = async (id) => {
  try {
    const url = `/agencies/${id}`;
    const { data: response } = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
