const http = require('http');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const db= require('./db');

const hostname = '127.0.0.1';
const port = 3000;

//Headers
app.use(function (req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

//Middlewares
app.use(bodyParser.json());

/***********************************************************/
const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

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

app.use(cookieSession({
  name:'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());

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

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

app.post('/api/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).send([user, "Cannot log in :()", info])
    }
    req.login(user, err => {
      res.send("Logged in")
    })
  })(req,res, next)
})

app.get('/api/logout', (req, res)=>{
  req.logout()
  console.log("logged out");
  return res.send()
})

app.get('/api/user', authMiddleware, (req,res)=>{
  let user= user.find(user =>{
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({user:user})
})


/***********************************************************/



//Show all Profile
app.get('/api/profile' , (req, res)=> {
  let sql = "SELECT * from ref_profil";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Show single Profile
app.get('/api/profile/:id' , (req, res)=> {
  let sql = "SELECT * from ref_profil WHERE id='"+req.params.id+"'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Show Faction & rang Profile
app.get('/api/profile/:race/:rang' , (req, res)=> {
  let sql = "SELECT id, Nom FROM ref_profil WHERE id_race= '" + req.params.race +"' AND id_rang = '"+ req.params.rang + "'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Show all aviable faction
app.get('/api/faction' , (req, res)=> {
  let sql = "SELECT * from race";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Show special rules for one profil
app.get('/api/regles/:id/:race' , (req, res)=> {
  let sql = "SELECT * from regles_speciales WHERE id_personnage='" + req.params.id + "' OR id_race= '" + req.params.race + "'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Add new Profile
app.post('/api/profile' , (req, res)=> {
  let data = {
    id_rang : req.body.id_rang,
    id_race : req.body.id_race,
    Nom : req.body.Nom,
    Prix : req.body.Prix,
    M : req.body.M,
    CC : req.body.CC,
    CT : req.body.CT,
    F : req.body.F,
    E : req.body.E,
    PV : req.body.PV,
    I : req.body.I,
    A : req.body.A,
    Cd : req.body.Cd,
    Arme_Armure : req.body.Arme_Armure,
    Regle : req.body.Regle
  };

  let sql = "INSERT INTO ref_profil SET ?";
  let query = db.query(sql, data, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Update Profile
app.put('/api/profile/:id' , (req, res)=> {
  let data = {
    id_rang : req.body.id_rang,
    id_race : req.body.id_race,
    Nom : req.body.Nom,
    Prix : req.body.Prix,
    M : req.body.M,
    CC : req.body.CC,
    CT : req.body.CT,
    F : req.body.F,
    E : req.body.E,
    PV : req.body.PV,
    I : req.body.I,
    A : req.body.A,
    Cd : req.body.Cd,
    Arme_Armure : req.body.Arme_Armure,
    Regle : req.body.Regle
  };

  let sql = "UPDATE ref_profil SET ? WHERE id=?";
  let query = db.query(sql, [data , req.params.id], function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Delete Profile
app.delete('/api/profile/:id', (req,res)=> {
  let sql = "DELETE from ref_profil WHERE id='"+req.params.id+"'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
