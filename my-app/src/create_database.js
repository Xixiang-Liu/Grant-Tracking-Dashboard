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

// create the table
// note: for convenience, for column names are undercased.
sql = `CREATE TABLE transactions (
    transaction_id INTEGER NOT NULL PRIMARY KEY,
    date TEXT,
    vendor TEXT,
    amount REAL,
    category TEXT,
    account TEXT,
    program TEXT,
    account_group TEXT,
    budget REAL,
    description TEXT
)`;
db.run(sql);

/*
// drop the table
sql = `DROP TABLE transactions`;
db.run(sql);
*/