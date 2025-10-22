module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
          '.json',
        ],
        root: ['./src'],
        alias: {
          '@/navigation': './src/navigation',
          '@/hooks': './src/hooks',
          '@/themes': './src/themes',
          '@/assests': './src/assests',
          '@/features': './src/features',
          '@/components': './src/components',
          '@/store': './src/store',
          '@/utils': './src/utils',
          '@/services': './src/services',
          '@/types': './src/types',
          '@/constants': './src/constants',
          '@/assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
