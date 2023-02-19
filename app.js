var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var movieRouter = require('./routes/movies');
var wathListRouter = require('./routes/watchList');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/watchlist', wathListRouter);
app.use('/users', usersRouter);

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL)
module.exports = app;
