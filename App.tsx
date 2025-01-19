import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AnswerScreen from './src/screens/AnswerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ResultScreen from './src/screens/ResultScreen';
import TabNavigator from './src/components/Bottom';
import LoginStack from './src/screens/stacks/LoginStack';
import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';
import OAuthScreen from './src/screens/OauthScreen';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Anwser"
        component={AnswerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App() {
  const navigationRef = useRef();

  useEffect(() => {
    console.log('useEffect 내부');
    const handleDeepLink = (event: {url: string}) => {
      console.log('handleDeepLink 내부');
      const url = event.url;
      // "coura://login?token=xxx" 형태
      console.log('딥 링크 url', url);

      // const tokenMatch = url.match(/token=(.*)/);
      const tokenMatch = url.match(/token=(.*)/);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];
        console.log('딥 링크에서 토큰 수신:', token);
        // 토큰 저장, 로그인 처리 등
      }
      SafariView.dismiss();

      // navigationRef.current?.navigate('Survey'); // SurveyScreen으로 이동
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
    <NavigationContainer>
      <Stack.Navigator>
        {/* 1) 로그인 & 설문을 처리하는 LoginStack */}
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{headerShown: false}}
        />
        {/* 2) 로그인 후 보여줄 메인 탭 */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        {/* 3) 예시로 필요한 ResultScreen */}
        {/* <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
