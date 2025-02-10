import * as Keychain from 'react-native-keychain';
import Cookies from '@react-native-cookies/cookies';

const ACCESS_TOKEN_SERVICE = 'accessToken';
const REFRESH_TOKEN_SERVICE = 'refreshToken';

export const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(ACCESS_TOKEN_SERVICE, token, {
      service: ACCESS_TOKEN_SERVICE,
    });
  } catch (error) {
    throw error;
  }
};
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
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({service: ACCESS_TOKEN_SERVICE});
  } catch (error) {
    throw error;
  }
};

export const storeRefreshToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(REFRESH_TOKEN_SERVICE, token, {
      service: REFRESH_TOKEN_SERVICE,
    });
  } catch (error) {
    throw error;
  }
};

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
    return null;
  }
};

export const removeRefreshToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({service: REFRESH_TOKEN_SERVICE});
  } catch (error) {
    throw error;
  }
};

export const clearWebViewCookies = async () => {
  try {
    await Cookies.clearAll();
  } catch (error) {
  }
};
