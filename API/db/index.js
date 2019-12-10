/*
* Need file name setup in current repersitory with this object
*  var setup = {
*  host     : 'localhost',
*  user     : '',
*  password : '',
*  database : 'Mordheim'};
* with your id and associated password
*/
const setup = require('./setup')
const mysql= require('mysql');

var connection = mysql.createConnection(setup);


connection.connect(function(err) {
  if(err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connect as id ' + connection.threadId);
});

module.exports = connection;
