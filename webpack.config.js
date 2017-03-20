const {IgnorePlugin, BannerPlugin} = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = `commonjs ${mod}`);

module.exports = {
  entry: './server/src/boot.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: './tslint.json'
        }
      },
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ],
  },
  plugins: [
    new IgnorePlugin(/\.(css|less)$/),
    new BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false})
  ],
  devtool: 'sourcemap'
};
