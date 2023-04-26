const webpack = require('webpack');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    assert: require.resolve('assert'),
    url: require.resolve('url'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer'),
    os: require.resolve('os-browserify/browser'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    stream: require.resolve('stream-browserify'),
  };

  config.plugins.push(
    ...[
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'allAssets',
        fileBlacklist: [/\.(js|ttf|png|eot|jpe?g|css|svg)/],
        as: 'font',
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'allAssets',
        fileBlacklist: [/\.(js|ttf|png|eot|woff2?|jpe?g|css)/],
        as: 'image',
      }),
    ]
  );

  return config;
};
