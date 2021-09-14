const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    src: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js'
  },

  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [ "@babel/preset-env", "@babel/preset-react" ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  }




}