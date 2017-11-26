module.exports = {
  entry: [
    'babel-polyfill',
    './src/client/webpack-entry.js',
  ],
  output: {
    filename: './dist/client/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'webpack',
          },
        },
      },
    ],
  },
  plugins: [],
}
