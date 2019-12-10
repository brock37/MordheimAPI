var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser= require('body-parser');
var cors = require('cors')
var db = require('./db');


var indexRouter = require('./routes/index');
var profilRouter = require('./routes/profil');
var factionRouter = require('./routes/faction');
var rulesRouter = require('./routes/rules');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors())


app.use('/', indexRouter);
app.use('/profil', profilRouter);
app.use('/faction', factionRouter);
app.use('/rules', rulesRouter);

module.exports = app;
