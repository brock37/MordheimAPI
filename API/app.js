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
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  credentials: true
}))

/***********************************************************/
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

app.use(cookieSession({
  name:'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]



app.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).send([user, "Cannot log in :()", info])
    }
    req.login(user, err => {
      res.send([user.name,"Logged in"])
    })
  })(req,res, next)
})

app.get('/logout', (req, res)=>{
  req.logout()
  console.log("logged out");
  return res.send()
})

app.get('/user', authMiddleware, (req,res)=>{
  let user= users.find(user =>{
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({user:user})
})


/***********************************************************/


app.use('/', indexRouter);
app.use('/profil', profilRouter);
app.use('/faction', factionRouter);
app.use('/rules', rulesRouter);

module.exports = app;
