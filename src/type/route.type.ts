//
export type RootStackParamList = {

  LoginStack: {
    screen: keyof LoginStackParamList;
  }; // LoginStack 내부로 이동

  MainTabs: undefined; // MainTabs로 이동

  HomeStack: {
    screen: keyof HomeStackParamList;
  }; // LoginStack 내부로 이동

  // MainTabs: undefined; // MainTabs로 이동
};

export type LoginStackParamList = {
  Welcome: undefined;
  Survey: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Anwser: undefined;
  Result: undefined;
  Profile: undefined;
  Setting: undefined;
  Report: undefined;
  SettingProfile: undefined;
  Delete: undefined;
};
