// Axios 인스턴스 설정
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 기본 URL 설정
  //   timeout: 5000, // 요청 타임아웃 설정 (ms 단위)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더
  },
});
