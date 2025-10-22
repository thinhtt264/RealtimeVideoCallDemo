import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthStackParamList, ScreenNames } from '../types';
import { LoginScreen } from '@/features/auth/screens/login';
import { useAppSelector } from '@/store';
import IntroductionScreen from '@/features/auth/screens/introduce';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  const firstTimeLauch = useAppSelector(state => state.app.isFirstLaunch);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {firstTimeLauch ? (
        <Stack.Screen
          name={ScreenNames.Introduction}
          component={IntroductionScreen}
        />
      ) : (
        <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
