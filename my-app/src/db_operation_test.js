let op_file = require("./database_operations");

/*
op_file.insert("2064-08-07", 
               "vendor_2_test", 
               3.2, 
               "category_test", 
               "account_test_2", 
               "program_test", 
               "account_group", 
               4.5, 
               "description_test"
               );
*/

/*
op_file.update(Date('now'), 
               "vendor_2_test", 
               4.5, 
               "category_test", 
               "account_test", 
               "program_test", 
               "account_group", 
               2.3, 
               "description_test",
               // transaction_id
               1);
*/

//op_file.remove_by_id(2);

//op_file.remove_by_program("program_test");

//op_file.remove_by_date("2001-08-07");

// query
// if no condition on a parameter, set it to -1 (for number) or "*" (for text)
// due to javascript design, the return value (the transactions fit the condition) is "rows" below
query(
    -1, // transaction_id
    "2064-08-07", // date 
    "*", // vendor
    3.2, // amount 
    "*", // category 
    "*", // account 
    "*", // program 
    "*", // account_group 
    -1, // budget
    "*", // description
).then ((rows) => {
    // operate rows (the return value from query) here
    console.log(rows[1].account);
});