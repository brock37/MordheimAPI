const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

let users = [
  {
    id: 1,
    username: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    username: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]

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
