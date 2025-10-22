import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

const Container: React.FC<SafeAreaViewProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <SafeAreaView style={style} edges={['top']} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
