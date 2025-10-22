import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Theme } from '@react-navigation/native';
import { COLORS_DARK, COLORS_LIGHT } from './themeColors';

interface AppThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Define common fonts for all themes
const commonFonts = {
  regular: { fontFamily: '', fontWeight: '400' as const },
  medium: { fontFamily: '', fontWeight: '500' as const },
  bold: { fontFamily: '', fontWeight: '700' as const },
  heavy: { fontFamily: '', fontWeight: '900' as const },
};

export const AppThemeContext = createContext<AppThemeContextType>({
  theme: {
    dark: false,
    colors: COLORS_LIGHT,
    fonts: commonFonts,
  },
  isDark: false,
  setTheme: () => {},
});

export const AppThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme: Theme = {
    dark: isDark,
    colors: isDark ? COLORS_DARK : COLORS_LIGHT,
    fonts: commonFonts,
  };

  const setTheme = (themeMode: 'light' | 'dark') => {
    setIsDark(themeMode === 'dark');
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        isDark,
        setTheme,
      }}>
      {children}
    </AppThemeContext.Provider>
  );
};
