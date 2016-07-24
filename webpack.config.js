var path = require('path');
var webpack = require('webpack');
var jeet = require('jeet');
var axis = require('axis');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  entry: {
    Client: './src/client',
    iHomeFinderTop: './src/jsx/iHomeFinderTop.js',
    iHomeFinderFoot: './src/jsx/iHomeFinderFoot.js'
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    },{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  },
  stylus: {
    use: [axis(), jeet(), rupture(), autoprefixer()]
  },
  node: {
    fs: "empty"
  }
};
