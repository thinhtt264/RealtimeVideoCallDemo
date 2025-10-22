export enum ScreenNames {
  Home = 'home',
  Settings = 'settings',
  Profile = 'profile',
  AuthStack = 'authStack',
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgotPassword',
  Introduction = 'introduction',
  WebRTCTest = 'webRTCTest',
  Call = 'call',
}

export type AppStackParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.Settings]: undefined;
  [ScreenNames.Profile]: undefined;
  [ScreenNames.AuthStack]: AuthStackParamList;
  [ScreenNames.WebRTCTest]: undefined;
  [ScreenNames.Call]: {
    url: string;
  };
};

export type AuthStackParamList = {
  [ScreenNames.Login]: undefined;
  [ScreenNames.Register]: undefined;
  [ScreenNames.ForgotPassword]: undefined;
  [ScreenNames.Introduction]: undefined;
};
