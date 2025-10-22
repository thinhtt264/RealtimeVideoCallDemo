import { AppThemeContext } from './AppThemeContext';
import { useContext } from 'react';

export const useAppTheme = () => {
  const { theme } = useContext(AppThemeContext);
  return theme;
};
