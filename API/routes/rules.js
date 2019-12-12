var express = require('express');
var router = express.Router();
const db= require('../db');

/* GET rules listing for profil. */
router.get('/:id/:race', function(req, res, next) {
  let sql = "SELECT * from regles_speciales WHERE id_personnage='" + req.params.id + "' OR id_race= '" + req.params.race + "'";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}))
  });
});

module.exports = router;
