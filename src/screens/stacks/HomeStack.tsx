import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnswerScreen from '../AnswerScreen';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import ResultScreen from '../ResultScreen';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Answer"
        component={AnswerScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
