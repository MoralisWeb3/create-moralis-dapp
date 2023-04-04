module.exports = {
  extends: ['@moralisweb3', 'plugin:@next/next/recommended'],
  plugins: ['cypress'],
  ignorePatterns: ['**/build/**/*'],
  env: {
    browser: true,
    'cypress/globals': true,
  },
};
