// require needed stuffs
var mysql = require('mysql');

// connection information
var con = mysql.createConnection({
  host: "localhous-east.connect.psdb.cloudst",
  user: "wq7ze3yylpob237bz1xi",
  password: "pscale_pw_cIe5yy8VtcFCCUcUyVksF3P39v9YXr9cNS5OzBQINMK",
  database: "grant_tracking"
});

// create the table
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
