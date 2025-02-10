export const ROUTES = {
  BOTTOM_STACK: 'BottomStack',
  HOME_STACK: 'HomeStack',
  LOGIN_STACK: 'LoginStack',
  PROFILE_STACK: 'ProfileStack',
  WELCOME: 'Welcome',
  SURVEY: 'Survey',
  LOGIN: 'Login',
  HOME: 'Home',
  ANSWER: 'Answer',
  RESULT: 'Result',
  SETTING_PROFILE: 'SettingProfile',
  DELETE: 'Delete',
  PROFILE: 'Profile',
  SETTING: 'Setting',
  REPORT: 'Report',
} as const;

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES];
