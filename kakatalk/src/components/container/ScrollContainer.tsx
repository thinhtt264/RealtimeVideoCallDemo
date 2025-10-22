import { ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LAYOUTS } from '@/utils';
import { ScrollContainerProps } from './types';

const ScrollContainerComponent: React.FC<ScrollContainerProps> = props => {
  const { contentContainerStyle } = props;

  return (
    <SafeAreaView style={[LAYOUTS.fill]} edges={['top']} {...props}>
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollContainerComponent;
