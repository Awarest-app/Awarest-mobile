// Axios 인스턴스 설정
import axios from 'axios';
import {getToken} from './secureStorage';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 기본 URL 설정
  //   timeout: 5000, // 요청 타임아웃 설정 (ms 단위)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더
  },
  withCredentials: true,
});

// 요청 인터셉터: 토큰 자동 포함
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken(); // Secure Storage에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 포함
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 에러 처리
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
