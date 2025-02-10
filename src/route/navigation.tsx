// navigationService.ts
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// 현재 스택에서 screen 이동 함수
export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

// root의 스택 이동
export function resetRoot(routeName: string) {
  // console.log('resetRoot outer', routeName);
  if (navigationRef.isReady()) {
    // console.log('resetRoot', routeName);
    navigationRef.reset({
      index: 0,
      routes: [{name: routeName}],
    });
  }
}

// 초기 렌더링 상태 저장 -> HOME으로 바로 렌더링 시키기
export const stateInitHomeScreen = {
  index: 0,
  routes: [
    {
      name: 'BottomStack',
      state: {
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      },
    },
  ],
};

// 초기 렌더링 상태 저장 -> Welcome으로 바로 렌더링 시키기
export const stateInitLoginScreen = {
  index: 0,
  routes: [
    {
      name: 'LoginStack',
      state: {
        index: 0,
        routes: [
          {
            name: 'Survey',
          },
        ],
      },
    },
  ],
};
