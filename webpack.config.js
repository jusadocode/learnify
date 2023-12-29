const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // The entry point file described above
  entry: './src/sign-in.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  plugins: [
    new htmlWebpackPlugin({
      template: './src/sign-in.html',
      filename: 'sign-in.html',
      inject: 'body'
    }),
  ],
};
