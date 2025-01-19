import React, {useEffect} from 'react';
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
  useEffect(() => {
    console.log('딥 링크 성공');
    const handleDeepLink = (event: {url: string}) => {
      const url = event.url;
      // "coura://login?token=xxx" 형태
      console.log('딥 링크 url', url);
      const tokenMatch = url.match(/token=(.*)/);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];
        console.log('딥 링크에서 토큰 수신:', token);
        // 토큰 저장, 로그인 처리 등
      }
      // 필요시 SafariViewController 닫기
      // (아래 예시에서 SFSafariViewController는 자동으로 닫히지 않으므로, dismiss 호출)
      // SafariViewController 닫기
      SafariView.dismiss();
      // SafariView.dismiss(); -> 하지만 dismiss는 사용자가 닫기 버튼 누르는 경우도 있으니, 로직에 따라 결정
    };

    // 앱 실행 중(포그라운드)일 때
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // 앱이 꺼져 있다가 링크로 실행된 경우(첫 실행 시)
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
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
