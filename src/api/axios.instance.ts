// Axios 인스턴스 설정
import axios, {AxiosHeaders, InternalAxiosRequestConfig} from 'axios';
import {getRefreshToken, getToken, storeToken} from './secureStorage';
import {API_URL} from '@env';
import {resetRoot} from '../route/navigation';

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

    // 토큰 주입
    const token = await getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`); // ✅ 올바른 방식
    }

    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: access token 만료 시 refresh endpoint 호출하여 재시도
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response) {
      const {status, data} = error.response;
      console.log('error.response:', data.message);
      console.log('error.response status:', status);

      if (
        status === 401 &&
        data.message === 'Access token expired. Please refresh token.' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          // refresh endpoint 호출; refresh token은 SecureStore에서 읽어서 헤더로 전송
          const refreshToken = await getRefreshToken();
          // 예를 들어, refresh token을 별도의 헤더 'x-refresh-token'에 담아 전송

          const refreshResponse = await axiosInstance.post(
            '/api/auth/refreshtoken',
            {},
            {headers: {'x-refresh-token': refreshToken}},
          );

          // BE가 응답 헤더 Authorization에 새 access token을 담아 반환했다고 가정
          let newAccessToken =
            refreshResponse.headers['authorization'] ||
            refreshResponse.headers.Authorization;

          // Bearer 접두어가 있다면 제거
          if (newAccessToken?.startsWith('Bearer ')) {
            newAccessToken = newAccessToken.substring(7);
          }

          if (newAccessToken) {
            await storeToken(newAccessToken);
            // originalRequest.headers.Authorization = `${newAccessToken}`;
            originalRequest.headers =
              originalRequest.headers || new AxiosHeaders();
            originalRequest.headers.set(
              'Authorization',
              `Bearer ${newAccessToken}`,
            );

            return axiosInstance(originalRequest);
          } else {
            // 새 토큰이 없는 경우 에러 처리
            throw new Error('New access token not found in response headers.');
          }
        } catch (refreshError) {
          // 토큰 갱신 실패 시 로그인 화면으로 이동 또는 재로그인 처리
          // resetRoot('Welcome');
          await new Promise<void>(resolve => {
            console.log('리프레쉬없음 login이동\n');
            resetRoot('LoginStack');
            // 네비게이션이 완료되길 기다림
            setTimeout(resolve, 100);
          });
          console.error('Token refresh failed:', refreshError);

          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
