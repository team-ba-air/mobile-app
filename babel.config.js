module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@network': './src/network',
          '@navigation': './src/navigations',
          '@scene': './src/scenes',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
