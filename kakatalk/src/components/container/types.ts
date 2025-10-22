import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface ScrollContainerProps extends SafeAreaViewProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
}
