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

// remove an existing transaction by id
function remove_by_id(transaction_id) {
    sql = `DELETE FROM transactions 
           WHERE transaction_id = ?`;

    db.run(
        sql, 
        [transaction_id],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by date
function remove_by_date(date) {
    sql = `DELETE FROM transactions 
           WHERE date = ?`;

    db.run(
        sql, 
        [date],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by program
function remove_by_program(program) {
    sql = `DELETE FROM transactions 
           WHERE program = ?`;

    db.run(
        sql, 
        [program],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by category
function remove_by_category(category) {
    sql = `DELETE FROM transactions 
           WHERE category = ?`;

    db.run(
        sql, 
        [category],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by vendor
function remove_by_vendor(vendor) {
    sql = `DELETE FROM transactions 
           WHERE vendor = ?`;

    db.run(
        sql, 
        [vendor],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by account
function remove_by_account(account) {
    sql = `DELETE FROM transactions 
           WHERE account = ?`;

    db.run(
        sql, 
        [account],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

// remove an existing transaction by account_group
function remove_by_account_group(account_group) {
    sql = `DELETE FROM transactions 
           WHERE account_group = ?`;

    db.run(
        sql, 
        [account_group],
        (err) => {
            if (err) return console.error(err.message);
        } 
    );
}

module.exports = {
    insert, 
    update, 
    remove_by_id, remove_by_date, remove_by_category, remove_by_program, 
    remove_by_account, remove_by_account_group, remove_by_vendor
};