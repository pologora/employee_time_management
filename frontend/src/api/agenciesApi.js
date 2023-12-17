import useAxios from '../hooks/useAxios';
import baseUrl from '../options/baseUrl';

const { post, deleteItem, get } = useAxios();

export const createAgency = async (data) => {
  const url = `${baseUrl}/agencies`;
  const response = await post(url, data);
  return response;
};

export const deleteAgency = async (id) => {
  const url = `${baseUrl}/agencies?id=${id}`;
  const response = await deleteItem(url);
  return response;
};

export const updateAgency = async (agencyToUpdate) => {
  const url = `${baseUrl}/agencies`;
  const response = await post(url, agencyToUpdate);
  return response;
};

export const getAgencies = async () => {
  const url = `${baseUrl}/agencies`;
  const response = await get(url);
  return response;
};

export const getAgencyByID = async (id) => {
  const url = `${baseUrl}/agencies/?id=${id}`;
  const response = await get(url);
  return response;
};
