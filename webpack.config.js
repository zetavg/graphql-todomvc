module.exports = {
  entry: [
    'babel-polyfill',
    './lib/js/src/client-re/WebpackEntry.js',
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
