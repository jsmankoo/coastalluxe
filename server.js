var express = require('express');
var morgan = require('morgan');
var prerender = require('prerender-node');

// var webpack = require(`webpack`);
// var WebpackDevServer = require(`webpack-dev-server`);
// var config = require(`./webpack.dev`);
//
// // Webpack Dev Server for Hot module reloading
// // Comment it out during production
// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   stats: {colors: true}
// }).listen(3001, `localhost`, function (err, result) {
//   if (err) {
//     return console.log(err);
//   }
//
//   console.log(`Listening at http://localhost:3001/`);
// });

var app = express();

app.set('port', process.env.NODE_PORT || 3000);
app.set('ip', process.env.NODE_IP || 'localhost');
app.set('views', __dirname + '/views');
app.set('view engine', "jade");

app.use(prerender.set('prerenderToken', 'CoDAzfhZxUpKBnS0cHwi'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));

app.get('/ihome', function(req, res){
  res.render('iHomefinder');
});

app.get('*', function(req, res){
  // const content = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
  res.render('index.jade');
});

app.listen(
  app.get('port'),
  app.get('ip'),
  function(){
    console.log('Coastal Luxe running: ' + app.get('ip') + ': ' + app.get('port'));
  }
);
