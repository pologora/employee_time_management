/* eslint-disable no-console */
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const url = 'http://localhost:3000/api/v1/users/login';

    const body = { email, password };
    const { data } = await axios.post(url, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
