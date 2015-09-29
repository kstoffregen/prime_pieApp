var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var orders = require('./routes/orders');
//var register = require('./routes/register');
var login = require('./routes/login');
var pie = require('./routes/pies');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/private',express.static(path.join(__dirname, 'private')));

//Mongoose connection
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/nocoast_pie_co';
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// Login tokens
var expressJwt = require ('express-jwt');
app.use('/private/*', expressJwt({secret: 'supersecret'}));

app.use(function (err, req, res, next){
  if (err.name ==='UnauthorizedError') {
    res.send(401, 'Invalid token. Please logout and log back in.');
  }
});

//// Stripe API
//var stripe = require('stripe')("sk_test_9v622sKDA6OBuykCjzuPcEH9");
////stripe.setApiKey();

app.use('/', routes);
app.use('/order', orders);
//app.use('/register', register);
app.use('/login', login);
app.use('/pie', pie);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
