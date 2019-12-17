var express = require('express');
var router = express.Router();
const passport = require('../passport');
const user = require('../user')

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).send([user, "Cannot log in :()", info])
    }
    req.login(user, err => {
      res.send([user.username,"Logged in"])
    })
  })(req,res, next)
})

router.get('/logout', (req, res)=>{
  req.logout()
  console.log("logged out");
  return res.send()
})

router.get('/data', authMiddleware, (req,res)=>{
    user.users.findById(req.session.passport.user, (err,user) =>{
      console.log([user, req.session])

      res.send({user:user})
  })
})


module.exports = router;
