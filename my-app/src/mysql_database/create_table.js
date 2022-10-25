// the url for my database on planetscale
DATABASE_URL='mysql://wq7ze3yylpob237bz1xi:pscale_pw_cIe5yy8VtcFCCUcUyVksF3P39v9YXr9cNS5OzBQINMK@us-east.connect.psdb.cloud/grant_tracking?ssl={"rejectUnauthorized":true}'

// require needed stuffs
require('dotenv').config()
const mysql = require('mysql2')

// create connection
const connection = mysql.createConnection(DATABASE_URL)
console.log('Connected to PlanetScale!')

// create table
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    // my query
    var sql = `CREATE TABLE transactions (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        date DATETIME, 
        vendor VARCHAR(100), 
        amount Decimal(6, 2), 
        category VARCHAR(100), 
        account VARCHAR(100), 
        program VARCHAR(100), 
        account_group VARCHAR(100), 
        budget Decimal(6, 2), 
        description VARCHAR(255)
    )`;

    // do the query
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

});

// end connection
//connection.end()