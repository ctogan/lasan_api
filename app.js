var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const db = require('./models');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerSumDocument = require ('./swagger.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const sumRouter = require('./routes/sum');

var app = express();
const multer = require("multer");

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'/public/images')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
  
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const title = 'Lasan API';
const port = '3001';
const baseUrl = 'http://127.0.0.1:3001/';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

db.sequelize.sync().then(() => {
  
  app.listen(port, () => console.log(title + " run on " + baseUrl))
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sum', sumRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSumDocument));

module.exports = app;
