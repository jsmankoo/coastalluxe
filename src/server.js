import express from "express";
import morgan from "morgan";

const app = express();

app.set('port', process.env.PORT||8000);
app.set('views', "./views");
app.set('view engine', "jade");

app.use(morgan('dev'));
app.use(express.static("./views"));

// app.get('/', (req, res)=>{
//   // const content = ReactDOMServer.renderToString(<ReactApp></ReactApp>);
//   // console.log(content)
//   res.render('index.jade');
// });

app.get('/ihome', (req, res)=>{
  res.render('iHomefinder');
});

app.get('*', (req, res)=>{
  // const content = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
  res.render('index.jade');
});

app.listen(app.get('port'), ()=>console.log(`Coastal Luxe running on port: ${app.get('port')}`));
