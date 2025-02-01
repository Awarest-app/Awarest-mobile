import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';

export const handleGoogleSignup = async () => {
  try {
    // 예: Docker나 서버가 3000 포트에서 동작 중이라면
    // 실제 기기면 IP 혹은 도메인을 사용
    const SERVER_URL = 'http://localhost:3000';

    // getToken으로 ac token 자체가 없다면 google oauth 모든 전략
    // const token = await getToken();
    // let url = token
    //   ? `${SERVER_URL}/api/auth/google?prompt=select_account`
    //   : `https://accounts.google.com/logout`;
    // await clearWebViewCookies();

    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${SERVER_URL}/api/auth/google`,
          // url: url,
          // url: 'https://accounts.google.com/logout',
          fromBottom: true,
        });
      })
      .catch(error => {
        console.error('SafariView not available:', error);
        // ✅ SafariView가 없을 경우 기본 브라우저에서 열기 (Android 지원)
        Linking.openURL(`${SERVER_URL}/api/auth/google?prompt=select_account`);
      });
    // setTimeout(() => {
    // }, 500); // Safari 세션이 닫힐 시간을 줌 (0.5초)
  } catch (error) {
    console.error('Failed to open Google OAuth:', error);
  }
};
