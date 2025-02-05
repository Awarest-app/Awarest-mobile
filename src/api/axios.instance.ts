// Axios 인스턴스 설정
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  storeRefreshToken,
} from './secureStorage';
import {API_URL} from '@env';
// export const SERVER_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: API_URL, // 기본 URL 설정
  //   timeout: 5000, // 요청 타임아웃 설정 (ms 단위)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더
  },
  withCredentials: true,
});

// 요청 인터셉터: 액세스 토큰 자동 포함
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 헤더 초기화 (필수)
    config.headers = config.headers || new AxiosHeaders();

    // Skip-Auth 처리
    if (config.headers.has('Skip-Auth')) {
      config.headers.delete('Authorization');
      config.headers.delete('Skip-Auth');
      return config;
    }

    // 토큰 주입
    const token = await getToken();
    // console.log('token', token);
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`); // ✅ 올바른 방식
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 헤더 접근 방식 개선 (타입 안전)
    // const newRefreshToken = response.headers.get('x-refresh-token');
    const newRefreshToken = response.headers['x-refresh-token'];
    // console.log('newRefreshToken', newRefreshToken);
    if (newRefreshToken) {
      await storeRefreshToken(newRefreshToken.toString());
    }
    return response;
  },
  async (error: AxiosError) => {
    // 타입 명시 강화
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      headers: AxiosHeaders;
    };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        // 리프레시 요청 헤더 타입 수정
        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(
          `http://localhost:3000/api/auth/refresh`,
          {refreshToken},
          {
            headers: new AxiosHeaders().set('Content-Type', 'application/json'),
          },
        );

        // 헤더 초기화 및 설정
        originalRequest.headers = originalRequest.headers || new AxiosHeaders();
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${response.data.accessToken}`,
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await Promise.all([removeToken(), removeRefreshToken()]);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// 응답 인터셉터: 에러 처리
// 새로운 쿠리를 발급받았을때 처리 과정
// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     // TODO -> 나중에 jwt token logic 추가
//     // removeToken();

//     console.error('Axios error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   },
// );

// 응답 인터셉터: 새로운 토큰이 헤더에 있을 경우 저장
// axiosInstance.interceptors.response.use(
//   async response => {
//     const newToken = response.headers['x-refresh-token'];
//     console.log('newToken', newToken);
//     if (newToken) {
//       await removeToken();
//       await storeToken(newToken);
//       // 필요에 따라 추가적인 로직 (예: 사용자에게 알림)
//     }
//     return response;
//   },
//   error => Promise.reject(error),
// );
