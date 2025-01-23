import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Bottom from './src/components/Bottom';
import LoginStack from './src/screens/stacks/LoginStack';
import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';
import {RootStackParamList} from './src/type/route.type';
import {getToken, removeToken, storeToken} from './src/api/secureStorage';

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
      const isSurveyMatch = url.match(/survey=(.*)/);
      // console.log('isSurveyMatch', isSurveyMatch);
      const isSurvey = isSurveyMatch ? isSurveyMatch[1] : null;
      // 토큰이 이미 존재 ->
      // survey가 없다면 survey로 이동
      // survey가 있다면 home으로 이동
      // await removeToken();

      const isToken = await getToken();
      console.log('isToken', isToken);
      if (isToken !== null) {
        if (isSurvey === 'ture') {
          navigationRef.current?.navigate('HomeStack', {
            screen: 'Home',
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

      const tokenMatch = url.match(/token=([^&]+)/);
      // console.log('tokenMatch', tokenMatch);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];
        console.log('토큰 존재없이 실행 token', token);
        storeToken(token);
      }
      navigationRef.current?.navigate('LoginStack', {
        screen: 'Survey',
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
      <Stack.Navigator>
        {/* 1) 로그인 & 설문을 처리하는 LoginStack */}
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{headerShown: false}}
        />

        {/* 2) bottom navigation*/}
        {/* 3) Main Stack */}
        <Stack.Screen
          name="HomeStack"
          component={Bottom}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
