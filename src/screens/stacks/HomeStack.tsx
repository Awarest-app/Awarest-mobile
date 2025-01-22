import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnswerScreen from '../AnswerScreen';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import ResultScreen from '../ResultScreen';
import SettingProfileScreen from '../SettingProfileScreen';
import ReportScreen from '../ReportScreen';
import DeleteScreen from '../DeleteScreen';

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
        name="Answer"
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
      <Stack.Screen
        name="SettingProfile" // 새로 추가된 스크린 이름
        component={SettingProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report" // 새로 추가된 스크린 이름
        component={ReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Delete" // 새로 추가된 스크린 이름
        component={DeleteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
