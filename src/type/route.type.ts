//
export type RootStackParamList = {
  // Home: undefined;
  // Anwser: undefined;
  // Result: undefined;
  // Profile: undefined;
  // // Topic: undefined;
  // //   Topic: {id: number}; // id를 number 타입으로 받도록 설정
  // //   Register: {type: 'edit' | 'create'}; // edit으로 들어온건지, create로 들어온건지 구분하기
  // // Member: undefined;
  // Login: undefined;

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
};
