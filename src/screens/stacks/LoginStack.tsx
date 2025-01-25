// LoginStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../MainScreen'; // 방금 만든 로그인/웰컴 화면
import SurveyScreen from '../SurveyScreen'; // 설문 화면
import LoginScreen from '../LoginScreen'; // 실제 로그인 화면

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      {/* 첫 화면: MainScreen (로그인/회원가입 버튼 있는 화면) */}
      <Stack.Screen
        name="Welcome"
        component={MainScreen}
        options={{headerShown: false}}
      />
      {/* 분기로 이동하는 설문 화면 */}
      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* 실제 로그인 화면 */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
