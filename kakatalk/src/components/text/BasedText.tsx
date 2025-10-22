import { Text, TextProps } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/themes';
import { FONT_FAMILY } from '@/constants';
import isEqual from 'react-fast-compare';

const BasedText: React.FC<TextProps> = ({ children, ...props }) => {
  const theme = useAppTheme();

  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[{ color: theme.colors.text }, props.style]}>
      {children}
    </Text>
  );
};

export default React.memo(BasedText, isEqual);

const BoldText: React.FC<TextProps> = props => (
  <BasedText
    {...props}
    style={[{ fontFamily: FONT_FAMILY.BOLD }, props.style]}
  />
);

const MediumText: React.FC<TextProps> = props => (
  <BasedText
    {...props}
    style={[{ fontFamily: FONT_FAMILY.MEDIUM }, props.style]}
  />
);

const RegularText: React.FC<TextProps> = props => (
  <BasedText
    {...props}
    style={[{ fontFamily: FONT_FAMILY.REGULAR }, props.style]}
  />
);

const ItalicText: React.FC<TextProps> = props => (
  <BasedText
    {...props}
    style={[{ fontFamily: FONT_FAMILY.ITALIC }, props.style]}
  />
);

export { BoldText, MediumText, RegularText, ItalicText };
