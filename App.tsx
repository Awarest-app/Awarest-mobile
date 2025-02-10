import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './src/screens/stacks/LoginStack';
import {Linking} from 'react-native';
import SafariView from 'react-native-safari-view';
import {getToken, storeRefreshToken, storeToken} from './src/api/secureStorage';
import BottomStack from './src/components/Bottom';
import {axiosGetUserSurvey} from './src/api/axios';
import {
  resetRoot,
  navigationRef,
  navigate,
  stateInitHomeScreen,
  stateInitLoginScreen,
} from './src/route/navigation';

const RootStack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState<any>(null);

  // token 판단 로직
  useEffect(() => {
    (async () => {
      try {
        // 토큰 가져와서 확인
        const token = await getToken();

        if (token) {
          // axiosGetUserSurvey 호출 시 오류가 발생하면 catch로 바로 빠짐
          const isSurvey = await axiosGetUserSurvey(); // -> survey

          setIsLoading(false);
          if (isSurvey) {
            // Survey가 있다면 HomeStack으로 이동
            setInitialState(stateInitHomeScreen);
          } else {
            // Survey가 있다면 HomeStack으로 이동
            setInitialState(stateInitLoginScreen);
          }
        } else {
          // 토큰이 없다면 로그인 스택으로 이동 -> 그대로
          setIsLoading(false);
        }
      } catch (error) {
        console.error('axiosGetUserSurvey 호출 중 에러:', error);

        // 오류가 발생하면 로그인 스택으로 이동하고 이후 코드는 실행하지 않음
        setIsLoading(false);
      }
    })();
  }, []);

  // oauth 판단 로직
  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
      // console.log('url:', url);

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

      console.log('survey', survey);

      if (accessToken && refreshToken) {
        try {
          await storeToken(accessToken);
          await storeRefreshToken(refreshToken);
          console.log('토큰 저장 완료');
        } catch (error) {
          console.error('토큰 저장 실패:', error);
        }
      }

      if (survey) {
        resetRoot('BottomStack');
        // navigate('BottomStack', {screen: 'HomeStack'});
      } else {
        navigate('LoginStack', {screen: 'Survey'});
        // resetRoot('Survey');
      }
      // 웹 뷰 닫기
      SafariView.dismiss();
      return;
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

  if (isLoading) {
    return null; // 또는 스플래시, 로딩 컴포넌트
  }

  return (
    <NavigationContainer initialState={initialState} ref={navigationRef}>
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
    </NavigationContainer>
  );
}

export default App;
