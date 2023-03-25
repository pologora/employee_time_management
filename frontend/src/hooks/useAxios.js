import axios from 'axios';
import { useState } from 'react';

const useAxios = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, method, data = null, headers = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url,
        data: data ? JSON.stringify(data) : null,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (err) {
      setError(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const get = async (url, headers = {}) => fetchData(url, 'GET', null, headers);

  const post = async (url, data, headers = {}) => fetchData(url, 'POST', data, headers);

  const patch = async (url, data, headers = {}) => fetchData(url, 'PATCH', data, headers);

  const deleteItem = async (url, headers = {}) => fetchData(url, 'DELETE', null, headers);

  return {
    deleteItem,
    patch,
    post,
    get,
    isLoading,
    error,
  };
};
export default useAxios;
