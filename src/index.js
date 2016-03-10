import express from "express";
import morgan from "morgan";

const app = express();

app.set('port', process.env.PORT||8000);
app.set('views', "./views");
app.set('view engine', "jade");

app.use(morgan('dev'));
app.use(express.static("./views"));

app.get('/', (req, res)=>{
  res.render('index.jade');
});

app.get('/ihome', (req, res)=>{
  res.render('iHomefinder');
});

app.listen(app.get('port'), ()=>console.log(`Coastal Luxe running on port: ${app.get('port')}`));
