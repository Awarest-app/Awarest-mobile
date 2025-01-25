import * as Keychain from 'react-native-keychain';

// JWT 토큰 저장
export const storeToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('jwt', token);
    // WHEN_UNLOCKED_THIS_DEVICE_ONLY: 데이터가 장치에 저장되며, 앱이 삭제되면 Keychain 항목도 삭제
    await Keychain.setGenericPassword('jwt', token, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    console.log('Token stored securely!');
  } catch (error) {
    console.error('Failed to store token', error);
  }
};

// JWT 토큰 읽기
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // JWT 토큰 반환
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve token', error);
    return null;
  }
};

// JWT 토큰 삭제
export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token removed!');
  } catch (error) {
    console.error('Failed to remove token', error);
  }
};

// // 토큰 저장
// export const handleLogin = async (token: string) => {
//   try {
//     await storeToken(token); // 토큰을 Secure Storage에 저장
//     console.log('Token saved successfully!');
//   } catch (error) {
//     console.error('Failed to save token:', error);
//   }
// };
