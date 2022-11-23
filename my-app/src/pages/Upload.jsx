import React, { useState } from "react";
import Papa from "papaparse";
import { handleInsertDB } from '../util/DataHelper.js'

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
          const csv = Papa.parse(target.result, { encoding: "utf-8", header: true, skipEmptyLines: true
        });
          const parsedData = csv?.data;
          const columns = Object.keys(parsedData[0]);
          console.log(columns, parsedData)
          const postReqs = []
          parsedData.forEach(element => {
            console.log({element})
              const item = handleInsertDB({
                date: element.Date, 
                vendor: element.Vendor, 
                amount: element.Amount, 
                category: element.Category, 
                account: element.Account, 
                program: element.Program, 
                'account_group': element['Account Group'],
                budget: element.Budget || -1, 
                description: element.Description
            })
            postReqs.push(item)
        });
        Promise.all([postReqs]).then(() => {
            alert('Uploaded successfully!')
        }).catch(err => {
            alert('Failed to uploaded!')
        })
        // setData(columns);
      };
      reader.readAsText(file);
  };

  return (
      <div style={{ marginTop: "3rem" }}>
          <label htmlFor="csvInput" style={{ marginTop: "1rem", display: "block" }}>
              Enter CSV File
          </label>
          <input
              onChange={handleFileChange}
              id="csvInput"
              name="file"
              type="File"
              style={{marginTop: "1rem"}}
          />
          <div>
              <button style={{ marginTop: "2rem", width: 100, height: 40 }} onClick={handleParse}>Upload</button>
          </div>
          <div style={{ marginTop: "3rem" }}>
              {error ? error : data.map((col,
                idx) => <div key={idx}>{col}</div>)}
          </div>
      </div>
  );
};

