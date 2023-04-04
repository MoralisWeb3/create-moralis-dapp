module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  ignorePatterns: ['**/dist/**/*', '**/*.test.ts'],
  rules: {
    'no-console': 'off',
    'no-html-link-for-pages': 'off',
  },
  globals: {
    NodeJS: true,
    BufferEncoding: 'readonly',
  },
};
