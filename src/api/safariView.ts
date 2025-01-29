import SafariView from 'react-native-safari-view';

export const handleGoogleSignup = async () => {
  try {
    // 예: Docker나 서버가 3000 포트에서 동작 중이라면
    // 실제 기기면 IP 혹은 도메인을 사용
    const SERVER_URL = 'http://localhost:3000';

    // 이미 로그인 되어 있는 사람 -> 토큰이 있다고 바로 넘겨? -> BE에 인증 처리 api필요할듯
    // if (token) {

    // SafariView로 열기
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url: `${SERVER_URL}/api/auth/google`,
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