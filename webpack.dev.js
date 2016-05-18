var path = require(`path`);
var webpack = require(`webpack`);
var jeet = require('jeet');
var axis = require('axis');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  devtool: `eval-source-map`,
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:3001`, // WebpackDevServer host and port
    `webpack/hot/only-dev-server`, // "only" prevents reload on syntax errors
    `./src/client`
  ],
  output: {
    path: path.join(__dirname, `public/js`),
    filename: `Client.bundle.js`,
    publicPath: `/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [`react-hot`, `babel`],
      include: path.join(__dirname, `src`)
    },
    {
      test: /\.json$/,
      loaders: [`json-loader`]
    },
    {
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
