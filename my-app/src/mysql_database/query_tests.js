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
test_case1 = new Transaction(0, "8888-01-01", "v", 233, "c", "a", "p", "ag", 22, "d")
test_insert(test_case1);
test_case2 = new Transaction(0, "7777-01-01", "v", 233, "c", "a", "p", "ag", 22, "d")
test_insert(test_case2);
test_case3 = new Transaction(0, "3333-01-01", "v", 555, "ccc", "a", "p", "ag", 22, "d")
test_insert(test_case3);
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

/*
test_delete(1)
*/

function test_filter(transaction) {

  // grab all the variables
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
    console.log(result)
  })
}

/*
test_case = new Transaction(2, "3333-01-01", `v2`, -1, "*", "*", "*", "*", -1, "*")
test_filter(test_case)
*/

// end the connection
connection.end()