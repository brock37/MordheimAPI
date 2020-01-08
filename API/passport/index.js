const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const user = require('../user')

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },

    (username, password, cb) => {
      user.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  user.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
})

module.exports = passport;
