const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // The entry point file described above
  entry: {
    'sign-in-bundle': './src/sign-in.js', // Entry point for sign-in page
    'test-bundle': './src/test.js', // Entry point for test page
    'index-bundle': './src/index.js',
    'chapter-bundle': './src/chapter.js',
    'progress-bundle': './src/student-progress.js', // Entry point for index page
    'ui-bundle': './src/ui.js', // Entry point for index page
  },

  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'none',
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/sign-in.html',
      filename: 'sign-in.html',
      inject: 'body',
      chunks: ['sign-in-bundle', 'ui-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/test.html',
      filename: 'test.html',
      inject: 'body',
      chunks: ['test-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['index-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/dppage1.html',
      filename: 'dppage1.html',
      inject: 'body',
      chunks: ['chapter-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/dppage2.html',
      filename: 'dppage2.html',
      inject: 'body',
      chunks: ['chapter-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/dppage3.html',
      filename: 'dppage3.html',
      inject: 'body',
      chunks: ['chapter-bundle']
    }),
    new htmlWebpackPlugin({
      template: './src/student-progress.html',
      filename: 'student-progress.html',
      inject: 'body',
      chunks: ['progress-bundle']
    }),
   
  ],
};
