import Axios from 'axios';
import info from '../info.json';

// create only one promise for the refresh token = avoid multiple refresh token calls
let refreshPromise: Promise<string> | null = null;
const clearPromise = () => (refreshPromise = null);

export const axios = Axios.create({
  baseURL: info.API_address,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    const errorMessage = error.response?.data;
    const isTokenExpired =
      errorPayloadCheck(errorMessage) &&
      errorMessage.message.includes('Invalid token');

    if (
      error.response?.status === 401 &&
      isTokenExpired &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(clearPromise);
      }

      await refreshPromise;
      return axios(prevRequest);
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (): Promise<string> => {
  const response = await axios.post<string>('/token/refresh');
  return response.data;
};

function errorPayloadCheck(data: unknown): data is { message: string } {
  return data instanceof Object && 'message' in data;
}
