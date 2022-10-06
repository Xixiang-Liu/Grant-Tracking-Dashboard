let op_file = require("./database_operations");

/*
op_file.insert("2001-08-07", 
               "vendor_2_test", 
               3.2, 
               "category_test", 
               "account_test", 
               "program_test", 
               "account_group", 
               2.3, 
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

op_file.remove_by_date("2001-08-07");