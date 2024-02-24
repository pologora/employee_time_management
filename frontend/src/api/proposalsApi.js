/* eslint-disable no-console */
import axiosInstance from '../options/axiosInstance';
import { vacationsProposalsStatusTypes } from '../options/proposalsTypes';

const getAllProposals = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllProposalsPagination = (page) => {
  const url = `/proposals?page=${page}`;
  return getAllProposals(url);
};

export const getAllProposalsByStatus = (status) => {
  const url = `/proposals?status=${status}`;
  return getAllProposals(url);
};

export const updateProposalById = async (id, data) => {
  try {
    const url = `/proposals/${id}`;
    const { data: response } = await axiosInstance.patch(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const rejectProposalById = async (id) => {
  await updateProposalById(id, { status: vacationsProposalsStatusTypes.rejected });
};
