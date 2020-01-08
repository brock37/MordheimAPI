var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var bodyParser= require('body-parser');
var cors = require('cors');
var db = require('./db');
var passport= require('./passport');


var indexRouter = require('./routes/index');
var profilRouter = require('./routes/profil');
var factionRouter = require('./routes/faction');
var rulesRouter = require('./routes/rules');
var userRouter = require('./routes/user')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST','PUT'],
  credentials: true
}))

app.use(cookieSession({
  name:'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/profil', profilRouter);
app.use('/faction', factionRouter);
app.use('/rules', rulesRouter);
app.use('/user', userRouter);

module.exports = app;
