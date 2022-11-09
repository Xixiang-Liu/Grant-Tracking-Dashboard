// create the connection
const mysql = require('mysql2')
const DATABASE_URL='mysql://hulhm1xpdtm47ix1wug0:pscale_pw_8XoyaZAtA8dLvHt21a4Wj9d1wn8IRNrvAkXzxvbgrhi@us-east.connect.psdb.cloud/grant_tracking?ssl={"rejectUnauthorized":true}'
const connection = mysql.createConnection(DATABASE_URL)

// initialize app
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// get all data from the table
app.get("/READ", (req,res)=>{
  const sql = "SELECT * FROM transactions"
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } 
    res.send(result)
  });   
});

// insert a row into the table


// end the connection
connection.end()