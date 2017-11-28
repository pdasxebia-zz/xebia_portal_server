var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Admins = require('./models/AdminSchema');
var app = express();
var cors=require('cors');
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()) ;
app.use(session({ secret: 'keyboard cat', cookieName: 'session', secret: 'random_string_goes_here', duration: 30 * 60 * 1000, activeDuration: 5 * 60 * 1000,})); // session secret
var index = require('./routes/index');
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
