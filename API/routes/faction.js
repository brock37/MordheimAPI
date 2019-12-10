var express = require('express');
var router = express.Router();
const db= require('../db');

/* GET faction listing. */
router.get('/', function(req, res, next) {
  let sql = "SELECT * from race";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


/* POST new faction. */
router.post('/', function(req, res, next) {
  let data = {
    nom_race : req.body.nom_race
  };

  let sql = "INSERT INTO race SET ?";
  let query = db.query(sql, data, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


/* UPDATE faction. */
router.put('/:name', function(req, res, next) {
  let data = {
    nom_race : req.body.name
  }

  let sql = "UPDATE race SET ? WHERE nom_race=?";
  let query = db.query(sql, [data , req.params.name], function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


/* DELETE id profil. */
router.delete('/:name', function(req, res, next) {
  let sql = "DELETE from race WHERE nom_race='"+req.params.name+"'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});


module.exports = router;
