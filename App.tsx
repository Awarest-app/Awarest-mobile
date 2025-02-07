import React, {useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './src/screens/stacks/LoginStack';
import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';
import {RootStackParamList} from './src/type/route.type';
import {
  getToken,
  removeToken,
  storeRefreshToken,
  storeToken,
} from './src/api/secureStorage';
import BottomStack from './src/components/Bottom';
import { axiosTestJwt } from './src/api/axios';

const RootStack = createNativeStackNavigator();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigationRef =
  useRef<NavigationContainerRef<RootStackParamList>>(null);
  useEffect(() => {
    (async () => {
      // 토큰 가져와서 확인
      //토큰 갱신 안돼서 터짐
      const token = await getToken();
      console.log('token:', token);
      if (token) {
        setIsLoggedIn(true);
        await axiosTestJwt();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const handleDeepLink = async (event: {url: string}) => {
        // console.log('handleDeepLink', event);
        const url = event.url;
        console.log('url:', url);
        // removeToken();
        // accessToken, refreshToken, survey 파라미터 추출
        const accessTokenMatch = url.match(/accessToken=([^&]+)/);
        const refreshTokenMatch = url.match(/refreshToken=([^&]+)/);
        const surveyMatch = url.match(/survey=([^&]+)/);
        
        const accessToken = accessTokenMatch
        ? decodeURIComponent(accessTokenMatch[1])
        : null;
        const refreshToken = refreshTokenMatch
        ? decodeURIComponent(refreshTokenMatch[1])
        : null;
        const survey = surveyMatch
        ? decodeURIComponent(surveyMatch[1]).replace(/#$/, '') === 'true'
        : false;

        if (accessToken && refreshToken) {
          try {
            await storeToken(accessToken);
            await storeRefreshToken(refreshToken);
            console.log('토큰 저장 완료');
          } catch (error) {
            console.error('토큰 저장 실패:', error);
          }
        }

        const isToken = await getToken();
        // console.log('isToken:', isToken);
        if (isToken !== null) {
          if (survey) {
            navigationRef.current?.reset({
              index: 0,
              routes: [
                {name: 'BottomStack',}],
            });
          } else {
            navigationRef.current?.navigate('LoginStack', {
              screen: 'Survey',
            });
          }
          // 웹 뷰 닫기
          SafariView.dismiss();
          return;
        }

        // 토큰이 없을 경우, 로그인 스택으로 이동
        navigationRef.current?.navigate('LoginStack', {
          screen: 'Welcome',
        });
        SafariView.dismiss();
      };

      // Background → Foreground: 앱이 이미 background에 있다가, 딥 링크로 포그라운드 복귀하면
      const subscription = Linking.addEventListener('url', handleDeepLink);

      // Cold Start: 앱이 완전히 종료된 상태에서 딥 링크로 실행
      Linking.getInitialURL().then(initialUrl => {
        if (initialUrl) handleDeepLink({url: initialUrl});
      });

      return () => {
        subscription.remove();
      };
    }})();
  }, []);
  if (isLoading) {
    return null; // 또는 스플래시, 로딩 컴포넌트
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <RootStack.Navigator>
          <RootStack.Screen
            name="BottomStack"
            component={BottomStack}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="LoginStack"
            component={LoginStack}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      ) : (
      <RootStack.Navigator>
          <RootStack.Screen
            name="LoginStack"
            component={LoginStack}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="BottomStack"
            component={BottomStack}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
