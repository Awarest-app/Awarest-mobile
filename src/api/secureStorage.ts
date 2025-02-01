// src/utils/secureStorage.ts
import * as Keychain from 'react-native-keychain';
import Cookies from '@react-native-cookies/cookies';

// 키 체인에 저장할 서비스 이름 정의
const ACCESS_TOKEN_SERVICE = 'accessToken';
const REFRESH_TOKEN_SERVICE = 'refreshToken';

// 액세스 토큰 저장
export const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(ACCESS_TOKEN_SERVICE, token, {
      service: ACCESS_TOKEN_SERVICE,
    });
  } catch (error) {
    console.error('액세스 토큰 저장 오류:', error);
    throw error;
  }
};

// 액세스 토큰 가져오기
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: ACCESS_TOKEN_SERVICE,
    });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('액세스 토큰 가져오기 오류:', error);
    return null;
  }
};

// 액세스 토큰 삭제
export const removeToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({service: ACCESS_TOKEN_SERVICE});
  } catch (error) {
    console.error('액세스 토큰 삭제 오류:', error);
    throw error;
  }
};

// 리프레시 토큰 저장
export const storeRefreshToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(REFRESH_TOKEN_SERVICE, token, {
      service: REFRESH_TOKEN_SERVICE,
    });
  } catch (error) {
    console.error('리프레시 토큰 저장 오류:', error);
    throw error;
  }
};

// 리프레시 토큰 가져오기
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: REFRESH_TOKEN_SERVICE,
    });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('리프레시 토큰 가져오기 오류:', error);
    return null;
  }
};

// 리프레시 토큰 삭제
export const removeRefreshToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({service: REFRESH_TOKEN_SERVICE});
  } catch (error) {
    console.error('리프레시 토큰 삭제 오류:', error);
    throw error;
  }
};

export const clearWebViewCookies = async () => {
  try {
    await Cookies.clearAll(); // ✅ 모든 쿠키 삭제
    console.log('🧹 WebView 쿠키 및 캐시 삭제 완료');
  } catch (error) {
    console.error('❌ WebView 쿠키 삭제 실패:', error);
  }
};
