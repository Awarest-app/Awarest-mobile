import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {fonts} from '../styles/fonts';
import GreenHomeIcon from '../assets/svg/home-icon-green.svg';
import GrayHomeIcon from '../assets/svg/home-icon-gray.svg';
import GreenProfileIcon from '../assets/svg/profile-icon-green.svg';
import GrayProfileIcon from '../assets/svg/profile-icon-gray.svg';
import {BlurView} from '@react-native-community/blur';
import {HomeStack} from '../screens/stacks/HomeStack';
import {ProfileStack} from '../screens/stacks/ProfileStack';
import {globalStyle} from '../styles/global';
const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: globalStyle.defaultTabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text_hint,
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
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <GreenHomeIcon width={size} height={size} />
            ) : (
              <GrayHomeIcon width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <GreenProfileIcon width={size} height={size} />
            ) : (
              <GrayProfileIcon width={size} height={size} />
            ),
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
  },
  hiddenTabBarStyle: {
    display: 'none',
  },
  tabBarLabelStyle: {
    fontFamily: fonts.roboto_medium,
    fontSize: 14,
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
