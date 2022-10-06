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
sql = `CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    first_name,
    last_name
)`;
db.run(sql);

/*
// drop the table
sql = `DROP TABLE transactions`;
db.run(sql);
*/