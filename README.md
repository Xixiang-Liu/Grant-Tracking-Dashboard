# Grant-Tracking-Dashboard
COMP 523, Fall 2022, Team E

## About The Project
Our client, Triangle Bikeworks, provides cycling-related growth opportunities for local youth. This semester, we’ll work with our client to create a web-based expense tracking bashboard.

In the past, our client used Excel spreadsheet and Quickbooks to track its programs’ expense. However, Excel and Quickbooks have their limits. The client would like us to create a standby app that allow them to better track the expense, in which they can apply filters, track the expense against their budget, and run comparison between years for the same line item.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* MySQL 
* Node.js 
* PlanetScale
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## How to start
* Make sure you have Node.js installed in your machine. (https://nodejs.org/en/download/)
* Open a terminal\
&emsp; 1. In mac, you can use the Terminal app.\
&emsp; 2. In window, you can use the Command Prompt. Press Win + R to open the Run box, then type "cmd" and hit Enter to open it.\
&emsp; 3. You can also use terminal in Visual Stuido code.

* Go to the location where your Grant-Tracking-Dashboard file is located using `cd` 
* Go to project directory by runing: `cd grant-tracking-dashboard`
* Then, in the project directory run the following command:\
  `npm start`
This command should automatically open the app in your browser.\
If not, open [http://localhost:3000](http://localhost:3000) to view it in your browser.
You may also see any lint errors in the console.

* open another terminal (don't kill the first one)
* Go to project directory again by runing:\
`cd grant-tracking-dashboard`
* Connect to database by running:\
 `node server.js`
* The app should be set up at this point.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Additional information

* If an error of “Module not found" displays in the browser, run the follwing code with the missing module. \
  For example, if the error message says: "`Module not found: Error: Can't resolve '@mui/material/Box' in xxxxxxxx`\
  This error message implies that you haven't install the module `@mui/material/Box`
  Then run the following command: ` npm install @mui/material/Box `  
  You can always Google the error message and check which package should be installed.
  
* The database is hosted by PlanetScale and is on the free plan. So the database will enter 'sleep' mode. All data will be backed up and stored, but you will not be able to connect to the database. Make sure use the app at least once 7 days. \
  If the database is in sleep mode, you can wake it by going to PlanetScale dashboard.
  Check https://planetscale.com/docs/concepts/database-sleeping for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to use the website

### Upload
* The user will be able to upload a csv file in the upload page.

###  Iomprtant Note: 
* Only csv files will be accepted 
* The date format must be `mm/dd/yyyy`
* The symbol `•` will **NOT** be accept, use `-` instead  




