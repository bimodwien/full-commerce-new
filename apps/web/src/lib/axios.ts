import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

export function axiosInstance(): AxiosInstance {
  const token = getCookie('access_token') || '';
  return axios.create({
    baseURL:
      '/api',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}

export function axiosPublicInstance(): AxiosInstance {
  return axios.create({
    baseURL:
      '/api',
    timeout: 10000,
  });
}
