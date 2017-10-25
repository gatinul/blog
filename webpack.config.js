'use strict';

// var path = require('path');
// var webpack = require('webpack')

// module.exports = {
//   entry: {
//     blogList: './app/build/blogList.ts',
//     tagList: './app/build/tagList.ts',
//   },
//   output: {
//     path:path.join(__dirname,'app/public'),
//     filename: '[name].js',
//   },
//   resolve: {
//     extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js' ],
//   },
//   module: {
//     loaders: [
//       { test: /\.tsx?$/, loader: 'ts-loader' },
//     ],
//   },
//   plugins:[
//     new webpack.BannerPlugin('the file is created by gatinul'),
//   ]
// };


const path = require('path');
const merge = require('webpack-merge');
// 引入通用webpack配置文件
const common = require('./webpack.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader'
        }
      ]
    }]},
  plugins: [new UglifyJSPlugin()],
  // 设置出口文件地址与文件名
  output: {
    path: path.resolve('./app/public/build'),
    filename: '[name].js'
  },
});