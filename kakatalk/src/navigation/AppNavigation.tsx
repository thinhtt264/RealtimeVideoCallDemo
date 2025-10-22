import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import RootNavigator from './RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/navigation';
import { useAppTheme } from '@/themes/useAppTheme';

const AppNavigation: React.FC = () => {
  const theme = useAppTheme();

  useEffect(() => {
    const initStore = async () => {
      //init logic
    };
    initStore().finally(() => {
      RNBootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <RootNavigator />
      {/* Snack bar */}
      {/* <SnackBar /> */}
      {/* Modal Alert */}
      {/* <Alert /> */}
      {/* App Loader */}
      {/* {loadingApp && <AppLoader />} */}
    </NavigationContainer>
  );
};

export default AppNavigation;
