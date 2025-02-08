// navigationService.ts
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../type/route.type';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    console.log('navigate', name, params);
    navigationRef.navigate(name as never, params as never);
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
