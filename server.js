var express = require('express');
var morgan = require('morgan');
var prerender = require('prerender-node');

const app = express();

app.set('port', process.env.PORT||8000);
app.set('views', "./views");
app.set('view engine', "jade");

app.use(prerender.set('prerenderToken', 'CoDAzfhZxUpKBnS0cHwi'));
app.use(morgan('dev'));
app.use(express.static("./dist"));

app.get('/ihome', function(req, res){
  res.render('iHomefinder');
});

app.get('*', function(req, res){
  // const content = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
  res.render('index.jade');
});

app.listen(app.get('port'), function(){
  console.log('Coastal Luxe running on port: ' + app.get('port'));
});
