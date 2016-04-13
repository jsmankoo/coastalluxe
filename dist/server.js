"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 8000);
app.set('views', "./views");
app.set('view engine', "jade");

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.static("./views"));

// app.get('/', (req, res)=>{
//   // const content = ReactDOMServer.renderToString(<ReactApp></ReactApp>);
//   // console.log(content)
//   res.render('index.jade');
// });

app.get('/ihome', function (req, res) {
  res.render('iHomefinder');
});

app.get('*', function (req, res) {
  // const content = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
  res.render('index.jade');
});

app.listen(app.get('port'), function () {
  return console.log("Coastal Luxe running on port: " + app.get('port'));
});