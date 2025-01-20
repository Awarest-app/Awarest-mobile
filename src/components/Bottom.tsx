import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';

import HomeIcon from '../assets/svg/home-icon.svg';
import ProfileIcon from '../assets/svg/profile-icon.svg';
// import {HomeStack} from '../screens/stacks/HomeStack';
import HomeScreen from '../screens/HomeScreen';
import { HomeStack } from '../screens/stacks/HomeStack';

const Tab = createBottomTabNavigator();

export default function Bottom() {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false, // Tab Navigator에서 자체 헤더는 숨기기
          tabBarIcon: (
            {color, size}, // 여기서 tabBarIcon을 사용합니다.
          ) => <HomeIcon fill={color} width={size} height={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false, // Tab Navigator에서 자체 헤더는 숨기기
          tabBarIcon: (
            {color, size}, // 여기서 tabBarIcon을 사용합니다.
          ) => <ProfileIcon fill={color} width={size} height={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
