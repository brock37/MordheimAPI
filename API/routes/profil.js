var express = require('express');
var router = express.Router();
const db= require('../db');

/* GET profil listing. */
router.get('/', function(req, res, next) {
  let sql = "SELECT * from ref_profil";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

/* GET profil at id. */
router.get('/:id', function(req, res, next) {
  let sql = "SELECT * from ref_profil WHERE id='"+req.params.id+"'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

/* GET profil for race and rang listing. */
router.get('/:race/:rang', function(req, res, next) {
  let sql = "SELECT id, Nom FROM ref_profil WHERE id_race= '" + req.params.race +"' AND id_rang = '"+ req.params.rang + "'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

/* POST new profil. */
router.post('/', function(req, res, next) {
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

/* UPDATE id profil. */
router.put('/:id', function(req, res, next) {
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

/* DELETE id profil. */
router.delete('/:id', function(req, res, next) {
  let sql = "DELETE from ref_profil WHERE id='"+req.params.id+"'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

module.exports = router;
