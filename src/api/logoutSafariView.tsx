// logoutUtil.ts

import SafariView from 'react-native-safari-view';
import {Linking} from 'react-native';
import {WebView} from 'react-native-webview';

/**
 * 사파리 뷰를 잠깐 열었다가 0.5~1초 뒤에 자동으로 닫아,
 * 구글 로그아웃 요청을 (쿠키 포함) 처리하는 방식
 */
export async function googleLogout() {
  try {
    // SafariView 사용 가능한지 확인
    const isAvailable = await SafariView.isAvailable();

    if (isAvailable) {
      SafariView.show({
        url: 'https://accounts.google.com/logout',
        fromBottom: true,
      });
      setTimeout(() => {
        SafariView.dismiss();
      }, 500);
    } else {
      Linking.openURL('https://accounts.google.com/logout');
    }
  } catch (error) {
    console.error('Google logout error', error);
  }
}
