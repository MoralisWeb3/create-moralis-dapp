module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  ignorePatterns: ['**/lib/**/*', '**/*.test.ts'],
  rules: {
    'no-console': 'off',
    'no-html-link-for-pages': 'off',
  },
  globals: {
    NodeJS: true,
    BufferEncoding: 'readonly',
  },
};
