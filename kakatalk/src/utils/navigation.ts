import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { AppStackParamList, ScreenNames } from '@/navigation';

export type RouteParams =
  | {
      screen?: ScreenNames;
      params?: any;
    }
  | object;

export const navigationRef = createNavigationContainerRef<any>();

export function navigateScreen(name: ScreenNames, params?: RouteParams) {
  navigationRef?.navigate(name, params);
}

export function replaceScreen(name: keyof AppStackParamList, params?: any) {
  navigationRef?.dispatch(StackActions.replace(name, params));
}

export function resetNavigator(
  screen: keyof AppStackParamList,
  params = {},
): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: screen, params }],
  });
}

export function goBack() {
  if (navigationRef.current?.canGoBack?.()) {
    navigationRef?.goBack();
  }
}
