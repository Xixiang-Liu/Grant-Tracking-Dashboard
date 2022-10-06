// this file provides functions that can be called to perform CURD operations

//require needed stuffs
const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to my databse
const db = new sqlite3.Database('./transactions.db', sqlite3.OPEN_READWRITE, (err) => {
    // if encounter error, see what is happening
    if (err) {
        return console.error(err.message);
    };
});

// add a new transaction
function insert(date, vendor, amount, category, account, program, account_group, budget, description) {
    sql = `INSERT INTO transactions (
        date,
        vendor,
        amount,
        category,
        account,
        program,
        account_group,
        budget,
        description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(
        sql,
        [date, vendor, amount, category, account, program, account_group, budget, description], 
        (err) => {
            if (err) return console.error(err.message);
        }       
    );
}

// update an existing transaction (identify by transaction_id)
function update(date, vendor, amount, category, account, program, account_group, budget, description, transaction_id) {
    sql = `UPDATE transactions SET (
        date,
        vendor,
        amount,
        category,
        account,
        program,
        account_group,
        budget,
        description
    )
    = (?, ?, ?, ?, ?, ?, ?, ?, ?)
    WHERE transaction_id = ?`;

    db.run(
        sql,
        [date, vendor, amount, category, account, program, account_group, budget, description, transaction_id], 
        (err) => {
            if (err) return console.error(err.message);
        }       
    );
}

module.exports = {insert, update};