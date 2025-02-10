import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  BottomStack: NavigatorScreenParams<BottomStackParamList>;
};

export type BottomStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type LoginStackParamList = {
  Welcome: undefined;
  Survey: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Answer: {question_id: number};

  Result: {question_xp: number};
  SettingProfile: undefined;
  Delete: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Setting: undefined;
  Report: undefined;
};
