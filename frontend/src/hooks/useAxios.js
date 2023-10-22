import axios from 'axios';

const useAxios = () => {
  const fetchData = async (url, method, data = null, headers = {}) => {
    const response = await axios({
      method,
      url,
      data: data ? JSON.stringify(data) : null,
      headers,
    });
    return response.data;
  };

  const get = async (url, headers = { 'Content-Type': 'application/json' }) => fetchData(url, 'GET', null, headers);

  const post = async (
    url,
    data,
    headers = { 'Content-Type': 'application/json' },
  ) => fetchData(url, 'POST', data, headers);

  const patch = async (
    url,
    data,
    headers = { 'Content-Type': 'application/json' },
  ) => fetchData(url, 'PATCH', data, headers);

  const deleteItem = async (url, headers = {}) => fetchData(url, 'DELETE', null, headers);

  return {
    deleteItem,
    patch,
    post,
    get,
  };
};
export default useAxios;
