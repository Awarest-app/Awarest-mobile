import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import GreenHomeIcon from '../assets/svg/home-icon-green.svg';
import GrayHomeIcon from '../assets/svg/home-icon-gray.svg';
import GreenProfileIcon from '../assets/svg/profile-icon-green.svg';
import GrayProfileIcon from '../assets/svg/profile-icon-gray.svg';
// import {globalStyle} from '../styles/global';
import {BlurView} from '@react-native-community/blur';
// import {HomeStack} from '../screens/stacks/HomeStack';
import {HomeStack} from '../screens/stacks/HomeStack';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {ProfileStack} from '../screens/stacks/ProfileStack';
import {globalStyle} from '../styles/global';
const Tab = createBottomTabNavigator();

export default function BottomStack() {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    if (routeName === 'Answer' || routeName === 'Result') {
      return styles.hiddenTabBarStyle;
    }
    return styles.tabBarStyle;
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: globalStyle.defaultTabBarStyle, // 스타일 객체 사용
        tabBarLabelStyle: styles.tabBarLabelStyle, // 라벨 스타일
        tabBarActiveTintColor: colors.primary, // 활성화 색상
        tabBarInactiveTintColor: colors.text_hint, // 비활성화 색상
        tabBarBackground: () => (
          <BlurView
            style={styles.background}
            blurType="light"
            blurAmount={25}
          />
        ),
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route}) => ({
          title: 'Home',
          headerShown: false, // Tab Navigator에서 자체 헤더는 숨기기
          tabBarStyle: getTabBarVisibility(route),
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <GreenHomeIcon width={size} height={size} />
            ) : (
              <GrayHomeIcon width={size} height={size} />
            ), // 여기서 tabBarIcon을 사용합니다.
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerShown: false, // Tab Navigator에서 자체 헤더는 숨기기
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <GreenProfileIcon width={size} height={size} />
            ) : (
              <GrayProfileIcon width={size} height={size} />
            ), // 여기서 tabBarIcon을 사용합니다.
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 74,
    borderTopWidth: 1,
    borderTopColor: colors.card_border,
    backgroundColor: 'rgba(237, 237, 237, 0.75)',
    position: 'absolute',
    // elevation: 0, // Android 그림자 제거
    // shadowOpacity: 0, // iOS 그림자 제거
  },
  hiddenTabBarStyle: {
    display: 'none',
  },
  tabBarLabelStyle: {
    //이름
    fontFamily: fonts.roboto_medium,
    fontSize: 14,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
