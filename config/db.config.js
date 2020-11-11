var mysql = require('mysql');
//local mysql db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ventk2'
})
module.exports = connection;