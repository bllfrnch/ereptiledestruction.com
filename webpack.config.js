'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'site.css',
  disable: process.env.NODE_ENV === "development"
});

require('es6-promise').polyfill();

console.log('WRITING TO...', path.resolve(__dirname, 'build'));

module.exports = {
  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.tpl$/,
        loader: 'mustache-loader'
      },

      {
        test: /\.scss$/,
        use: extractCSS.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              },
              {
                loader: 'postcss-loader'
              }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },

  plugins: [
    // Specify the resulting CSS filename
    extractCSS,

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/tpl/index.tpl'),
      inject: true,
      favicon: '',
      hash: true,
      cache: true,
      showErrors: true
    }),

    // todo: figure out autoprefixer
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
       }
    }),

    // Stylelint plugin
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: '',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
      quiet: false
    })
  ],

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
