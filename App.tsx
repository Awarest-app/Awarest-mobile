import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  AppState,
} from 'react-native';
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
import Logo from './src/components/Logo';
import colors from './src/styles/colors';
import { analytics } from './src/firebase/setting';

const RootStack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState<any>(null);
  const sessionStartTime = useRef<number | null>(null);
 
  useEffect(() => {
    const handleAppStateChange = async (state: string) => {
      const now = Date.now();
      if (state === 'active') {
        sessionStartTime.current = now;
        await analytics.logEvent('custom_session_start');
      } else if (state === 'background' && sessionStartTime.current) {
        const sessionDuration = (now - sessionStartTime.current) / 1000;
        await analytics.logEvent('custom_session_end', {
          duration_seconds: sessionDuration,
        });
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();

        if (token) {
          const isSurvey = await axiosGetUserSurvey();

          setIsLoading(false);
          if (isSurvey) {
            setInitialState(stateInitHomeScreen);
          } else {
            setInitialState(stateInitLoginScreen);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
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
        } catch (error) {
        }
      }

      if (survey) {
        resetRoot('BottomStack');
      } else {
        navigate('LoginStack', {screen: 'Survey'});
      }
      SafariView.dismiss();
      return;
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(initialUrl => {
      if (initialUrl) handleDeepLink({url: initialUrl});
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green_gradientStart,
        }}>
        <Logo />
      </View>
    )
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
