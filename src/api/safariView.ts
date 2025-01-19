import SafariView from 'react-native-safari-view';

export const handleGoogleSignup = async () => {
  try {
    // 예: Docker나 서버가 3000 포트에서 동작 중이라면
    const SERVER_URL = 'http://localhost:3000';
    // 실제 기기면 IP 혹은 도메인을 사용

    // SafariView로 열기
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${SERVER_URL}/auth/google`,
          // iOS 11+부터는 엔터프라이즈 환경 아니면 기본적으로 SFSafariViewController 적용
          fromBottom: true, // 모달처럼 밑에서 올라오는 효과
        });
      })
      .catch(error => {
        console.error('SafariView not available:', error);
      });
  } catch (error) {
    console.error('Failed to open Google OAuth:', error);
  }
};
