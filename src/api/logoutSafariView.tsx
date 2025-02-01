// logoutUtil.ts

import SafariView from 'react-native-safari-view';
import {Linking} from 'react-native';

/**
 * 사파리 뷰를 잠깐 열었다가 0.5~1초 뒤에 자동으로 닫아,
 * 구글 로그아웃 요청을 (쿠키 포함) 처리하는 방식
 */
export async function googleLogout() {
  try {
    // SafariView 사용 가능한지 확인
    const isAvailable = await SafariView.isAvailable();

    if (isAvailable) {
      // 1) SafariView를 열어 구글 로그아웃 URL 접근
      SafariView.show({
        url: 'https://accounts.google.com/logout',
        fromBottom: true,
        // animated: false, // 모달 애니메이션 끄는 옵션도 가능
      });

      // 2) 약간의 지연 후 (로그아웃 요청이 쿠키와 함께 전송될 시간 필요)
      setTimeout(() => {
        // 3) SafariView 닫기
        SafariView.dismiss();
      }, 500); // 1초 정도 (상황에 따라 500ms로 줄이기도)
    } else {
      // 사파리 뷰 미지원 기기라면, 기본 브라우저로 열기
      Linking.openURL('https://accounts.google.com/logout');
    }
  } catch (error) {
    console.error('Google logout error', error);
  }
}
