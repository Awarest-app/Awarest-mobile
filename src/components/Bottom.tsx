import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../styles/colors';
import HomeIcon from '../assets/svg/home-icon.svg';
import ProfileIcon from '../assets/svg/profile-icon.svg';
import { globalStyle } from '../styles/global';
import { BlurView } from "@react-native-community/blur";
// import {HomeStack} from '../screens/stacks/HomeStack';
import HomeScreen from '../screens/HomeScreen';
import { HomeStack } from '../screens/stacks/HomeStack';

const Tab = createBottomTabNavigator();

export default function Bottom() {
  return (
    <Tab.Navigator
      screenOptions={{
      tabBarStyle: styles.tabBarStyle, // 스타일 객체 사용
      tabBarLabelStyle: styles.tabBarLabelStyle, // 라벨 스타일
      tabBarActiveTintColor: colors.primary, // 활성화 색상
      tabBarInactiveTintColor: colors.text_hint, // 비활성화 색상
      tabBarBackground: () => (
        <BlurView style={styles.background}
          blurType="light"
          blurAmount={25}
        />
      ),
      }}
    >
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
        component={HomeStack}
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

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 76,
    borderTopWidth: 1,
    borderTopColor: colors.card_border,
    backgroundColor: 'rgba(237, 237, 237, 0.75)',
    position: 'absolute',
    // elevation: 0, // Android 그림자 제거
    // shadowOpacity: 0, // iOS 그림자 제거
  },
  tabBarLabelStyle: {
    //이름
    fontSize: 12,
    fontWeight: '600',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});