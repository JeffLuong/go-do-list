const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'app.js',
    chunkFilename: '[name].app.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [htmlWebpackPlugin]
};