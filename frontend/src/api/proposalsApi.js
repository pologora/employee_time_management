/* eslint-disable no-console */

import axiosInstance from '../options/axiosInstance';

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
