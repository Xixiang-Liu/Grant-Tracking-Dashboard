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
app.get("/read", (req,res)=>{
  
  const sql = "SELECT * FROM transactions"
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } 
    res.send(result)
  })
})


// insert a row into the table
app.post('/insert', (req,res)=> {

  // grab all the variables
  const id = req.body.id
  const date = req.body.date
  const vendor = req.body.vendor
  const amount = req.body.amount
  const category = req.body.category
  const account = req.body.account
  const program = req.body.program
  const account_group = req.body.account_group
  const budget = req.body.budget
  const description = req.body.description
  
  // define query parameters
  const sql = `INSERT INTO transactions (
    id,
    date,
    vendor,
    amount,
    category,
    account,
    program,
    account_group,
    budget,
    description
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )`
  
  const sql_arg = [
    id,
    date,
    vendor,
    amount,
    category,
    account,
    program,
    account_group,
    budget,
    description
  ]

  connection.query(sql, sql_arg, (err, result) => {
    if (err) {
      console.log(err)
    } 
    console.log(result)
  })   
})

// end the connection
connection.end()