import React, { useState } from "react";
import Papa from "papaparse";
import Transaction from "../mysql_database/transaction"
 
// Allowed extensions for input file
const allowedExtensions = ["csv"];

export const Upload = () => {
  // This state will store the parsed data
  const [data, setData] = useState([]);
     
  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");
   
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
      setError("");
       
      // Check if user has entered the file
      if (e.target.files.length) {
          const inputFile = e.target.files[0];
           
          // Check the file extensions, if it not
          // included in the allowed extensions
          // we show the error
          const fileExtension = inputFile?.type.split("/")[1];
          if (!allowedExtensions.includes(fileExtension)) {
              setError("Please input a csv file");
              return;
          }

          // If input type is correct set the state
          setFile(inputFile);
      }
  };
  const handleParse = () => {
       //!!!!!!!!CHANGE TO API PASSING CSV FILE TO DB!!!!
       
      // If user clicks the parse button without
      // a file we show a error
      if (!file) return setError("Enter a valid file");

      // Initialize a reader which allows user
      // to read any file or blob.
      const reader = new FileReader();
       
      // Event listener on reader when the file
      // loads, we parse it and set the data.
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        // document.write(JSON.stringify(parsedData))

        const transaction = new Transaction(
          0, 
          parsedData[0].date, 
          parsedData[0].vendor, 
          parsedData[0].amount, 
          parsedData[0].category, 
          parsedData[0].account, 
          parsedData[0].program, 
          parsedData[0].account_group, 
          parsedData[0].budget, 
          parsedData[0]["description\n"]
        )
        document.write(JSON.stringify(transaction))
      };
      reader.readAsText(file);
  };

  return (
      <div>
          <label htmlFor="csvInput" style={{ display: "block" }}>
              Enter CSV File
          </label>
          <input
              onChange={handleFileChange}
              id="csvInput"
              name="file"
              type="File"
          />
          <div>
              <button onClick={handleParse}>Parse</button>
          </div>
          <div style={{ marginTop: "3rem" }}>
              {error ? error : data.map((col,
                idx) => <div key={idx}>{col}</div>)}
          </div>
      </div>
  );
};

