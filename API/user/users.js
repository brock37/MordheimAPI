var db = require('../db');

 var records = [];

function loadUser(){
  let sql = "SELECT * from users";
  let query = db.query(sql, function (err, results) {
    if(err) throw err;
    console.log("Loading user");

    records= results
    console.log(records);
  });
}

loadUser()

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    console.log(["Find user", username]);
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      console.log(["Compare",record.username, username]);
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
