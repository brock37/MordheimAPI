const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')

let users = []

function loadUser(){
  let sql = "SELECT * from users";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    console.log("Loading user");

    users= results
    console.log(users);
  });
}

loadUser()

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.username === username && user.password === password
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

module.exports = passport;
