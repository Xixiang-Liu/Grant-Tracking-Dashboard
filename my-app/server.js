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

// initialize PORT
const PORT = 5000


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
  // no id here, id is auto increment
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
    ?, ?, ?, ?, ?, ?, ?, ?, ?
  )`
  
  // define query arguments
  const sql_arg = [
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


// update a row in the database
// according to the id
app.post('/update',(req,res)=>{

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
  const sql = `UPDATE transactions SET 
    date = ?,
    vendor = ?,
    amount = ?,
    category = ?,
    account = ?,
    program = ?,
    account_group = ?,
    budget = ?,
    description = ?
  WHERE id = ?`
  
  // define query arguments
  const sql_arg = [
    date,
    vendor,
    amount,
    category,
    account,
    program,
    account_group,
    budget,
    description,
    id
  ]

  connection.query(sql, sql_arg, (err, result) => {
    if (err) {
      console.log(err)   
    } 
    console.log(result)
  })    
})


// delete a row
// according to the id
app.delete('/delete/:id',(req,res)=>{
  const id = req.params.id;

  // define query
  const sql =  `DELETE FROM transactions WHERE id = ?`

  // define query arguments
  const sql_arg = id
  
  connection.query(sql, sql_arg, (err, result) => {
    if (err) {
      console.log(err)   
    } 
  })   
})


// filter according to the condition
// take an Transaction object
// For the object: 
// if a parameter has a specific value, then this is a condition
// otherwise, the value should be "*" for string and -1 for number, means no condition here 
app.get("/filter", (req,res)=>{

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
  
  // construct the query
  var sql = `SELECT * FROM transactions WHERE`
  var had_condition = false
  if (id != -1) {
    sql += ` id = ${id}`
    had_condition = true
  }
  if (date != `*`) {
    if (had_condition)
      sql += ` AND date = '${date}'`
    else {
      sql += ` date = '${date}'`
      had_condition = true
    }
  }
  if (vendor != `*`) {
    if (had_condition)
      sql += ` AND vendor = '${vendor}'`
    else {
      sql += ` vendor = '${vendor}'`
      had_condition = true
    }
  }
  if (amount != -1) {
    if (had_condition)
      sq1 += ` AND amount = ${amount}`
    else {
      sql += ` amount = ${amount}`
      had_condition = true
    }
  }
  if (category != `*`) {
    if (had_condition)
      sql += ` AND category = '${category}'`
    else {
      sql += ` category = '${category}'`
      had_condition = true
    }
  }
  if (account != `*`) {
    if (had_condition)
      sql += ` AND account = '${account}'`
    else {
      sql += ` account = '${account}'`
      had_condition = true
    }
  }
  if (program != `*`) {
    if (had_condition)
      sql += ` AND program = '${program}'`
    else {
      sql += ` program = '${program}'`
      had_condition = true
    }
  }
  if (account_group != `*`) {
    if (had_condition)
      sql += ` AND account_group = '${account_group}'`
    else {
      sql += ` account_group = '${account_group}'`
      had_condition = true
    }
  }
  if (budget != -1) {
    if (had_condition)
      sq1 += ` AND budget = ${budget}`
    else {
      sql += ` budget = ${budget}`
      had_condition = true
    }
  }
  if (description != `*`) {
    if (had_condition)
      sql += ` AND description = '${description}'`
    else {
      sql += ` description = '${description}'`
      had_condition = true
    }
  }
  // print to check if the query is correct
  console.log(sql)
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } 
    res.send(result)
  })
})


// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})


// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
})


// end the connection
// connection.end()