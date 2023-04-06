const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
require('dotenv').config({ path: './.env' });

// All .env variables prefixed with this value are included in the build
const publicEnvPrefix = 'PUBLIC_';

function filterEnv(env) {
  return Object.entries(env)
    .filter(([key, value]) => key.startsWith(publicEnvPrefix))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(filterEnv(process.env)),
    }),
    new NodePolyfillPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
};
