// create the connection
const mysql = require('mysql2')
const Transaction = require('./transaction')
const DATABASE_URL='mysql://hulhm1xpdtm47ix1wug0:pscale_pw_8XoyaZAtA8dLvHt21a4Wj9d1wn8IRNrvAkXzxvbgrhi@us-east.connect.psdb.cloud/grant_tracking?ssl={"rejectUnauthorized":true}'
const connection = mysql.createConnection(DATABASE_URL)

function test_insert(transaction) {
  // grab all the variables
  // no id here, id is auto increment
  const date = transaction.date
  const vendor = transaction.vendor
  const amount = transaction.amount
  const category = transaction.category
  const account = transaction.account
  const program = transaction.program
  const account_group = transaction.account_group
  const budget = transaction.budget
  const description = transaction.description
  
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
}

/*
// id is auto increment, so arbitrary value here for insert
test_case = new Transaction(0, "8888-01-01", "v", 233, "c", "a", "p", "ag", 22, "d")
test_insert(test_case);
*/

function test_read() {
    const sql = "SELECT * FROM transactions"
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } 
      console.log(result)
    })
}

/*
test_read();
*/

function test_update(transaction) {
    const id = transaction.id
    const date = transaction.date
    const vendor = transaction.vendor
    const amount = transaction.amount
    const category = transaction.category
    const account = transaction.account
    const program = transaction.program
    const account_group = transaction.account_group
    const budget = transaction.budget
    const description = transaction.description

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
}

/*
test_case = new Transaction(2, "3333-01-01", "v2", 888, "c", "a", "p", "ag", 22, "d")
test_update(test_case)
*/

function test_delete(id) {
  // define query
  const sql =  `DELETE FROM transactions WHERE id = ?`

  // define query arguments
  const sql_arg = id
  
  connection.query(sql, sql_arg, (err, result) => {
    if (err) {
      console.log(err)   
    } 
  })   
}

test_delete(1)

// end the connection
connection.end()