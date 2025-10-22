import { KeyboardEventName, Platform as NativePlatform } from 'react-native';

const PLATFORM = NativePlatform.OS;
const isAndroid = PLATFORM === 'android';
const isIos = PLATFORM === 'ios';

const KeyboardEvent = {
  KEYBOARD_SHOW: NativePlatform.select({
    ios: 'keyboardWillShow',
    android: 'keyboardDidShow',
    default: '',
  }) as KeyboardEventName,
  KEYBOARD_HIDE: NativePlatform.select({
    ios: 'keyboardWillHide',
    android: 'keyboardDidHide',
    default: '',
  }) as KeyboardEventName,
};

const isDev = __DEV__;
const Platform = {
  isDev,
  isIos,
  isAndroid,
  KeyboardEvent,
  OS: PLATFORM,
  Version: NativePlatform.Version,
};

export default Platform;
