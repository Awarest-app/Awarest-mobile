import axios, {AxiosHeaders, InternalAxiosRequestConfig} from 'axios';
import {getRefreshToken, getToken, storeToken} from './secureStorage';
import {API_URL} from '@env';
import {resetRoot} from '../route/navigation';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || new AxiosHeaders();
    const token = await getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response) {
      const {status, data} = error.response;
      if (
        status === 401 &&
        data.message === 'Access token expired. Please refresh token.' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const refreshToken = await getRefreshToken();
          const refreshResponse = await axiosInstance.post(
            '/api/auth/refreshtoken',
            {},
            {headers: {'x-refresh-token': refreshToken}},
          );
          let newAccessToken =
            refreshResponse.headers['authorization'] ||
            refreshResponse.headers.Authorization;
          if (newAccessToken?.startsWith('Bearer ')) {
            newAccessToken = newAccessToken.substring(7);
          }
          if (newAccessToken) {
            await storeToken(newAccessToken);
            originalRequest.headers =
              originalRequest.headers || new AxiosHeaders();
            originalRequest.headers.set(
              'Authorization',
              `Bearer ${newAccessToken}`,
            );
            return axiosInstance(originalRequest);
          } else {
            throw new Error('New access token not found in response headers.');
          }
        } catch (refreshError) {
          await new Promise<void>(resolve => {
            resetRoot('LoginStack');
            setTimeout(resolve, 100);
          });
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
