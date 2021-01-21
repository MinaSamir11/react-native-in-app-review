module.exports = {
  root: true,
  plugins: ['jest', 'unused-imports'],
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
  },
  env: {
    'jest/globals': true,
  },
};
