const http = require('http');
const express = require('express');
const mysql= require('mysql');
const bodyParser= require('body-parser');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

//Middlewares
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mordheim',
  password : '>EGX8{-M5s4m;7h~',
  database : 'Mordheim'
});

connection.connect(function(err) {
  if(err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connect as id ' + connection.threadId);
});

//Show all Profile
app.get('/api/profile' , (req, res)=> {
  let sql = "SELECT * from ref_profil";
  let query = connection.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Show single Profile
app.get('/api/profile/:id' , (req, res)=> {
  let sql = "SELECT * from ref_profil WHERE id='"+req.params.id+"'";
  let query = connection.query(sql, function (err, results) {
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
  let query = connection.query(sql, data, function (err, results) {
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
  let query = connection.query(sql, [data , req.params.id], function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

//Delete Profile
app.delete('/api/profile/:id', (req,res)=> {
  let sql = "DELETE from ref_profil WHERE id='"+req.params.id+"'";
  let query = connection.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
