import React, {useEffect, useRef} from 'react';
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

const RootStack = createNativeStackNavigator();

function App() {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      // console.log('handleDeepLink', event);
      const url = event.url;

      removeToken();
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
      const survey = surveyMatch ? decodeURIComponent(surveyMatch[1]) : null;

      // console.log('accessToken:', accessToken);
      // console.log('refreshToken:', refreshToken);
      // console.log('survey:', survey);

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
        if (survey === 'true') {
          navigationRef.current?.reset({
            index: 0,
            routes: [
              {
                name: 'BottomStack',
              },
            ],
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
        screen: 'Login',
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
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {/* 1) 로그인 & 설문을 처리하는 LoginStack */}
        <RootStack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{headerShown: false}}
        />
        {/* 2) bottom navigation*/}
        {/* 3) Main Stack */}
        <RootStack.Screen
          name="BottomStack"
          component={BottomStack}
          options={{headerShown: false}}
        />

        {/* 이럼  Bottom을 인식 못함 */}
        {/* <RootStack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
