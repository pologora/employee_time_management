import useAxios from '../hooks/useAxios';

const baseUrl = 'https://beckend-employee-app.onrender.com/api/v1';

const {
  post, deleteItem, get, patch,
} = useAxios();

export const createAgency = async (data) => {
  const url = `${baseUrl}/agencies`;
  const response = await post(url, data);
  return response;
};

export const deleteAgency = async (id) => {
  const url = `${baseUrl}/agencies/${id}`;
  const response = await deleteItem(url);
  return response;
};

export const updateAgency = async (agencyToUpdate) => {
  const { id } = agencyToUpdate;
  const url = `${baseUrl}/agencies/${id}`;
  const response = await patch(url, agencyToUpdate);
  return response;
};

export const getAgencies = async () => {
  const url = `${baseUrl}/agencies`;
  const response = await get(url);
  return response;
};

export const getAgencyByID = async (id) => {
  const url = `${baseUrl}/agencies/${id}`;
  const response = await get(url);
  return response;
};
