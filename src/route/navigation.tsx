import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    // navigationRef.navigate(name as never, params as never);
  }
}

export function resetRoot(routeName: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: routeName}],
    });
  }
}

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
