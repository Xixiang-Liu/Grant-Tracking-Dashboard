import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

// initialization
dotenv.config()
const app = express()

// create the connection
const DATABASE_URL='mysql://hulhm1xpdtm47ix1wug0:pscale_pw_8XoyaZAtA8dLvHt21a4Wj9d1wn8IRNrvAkXzxvbgrhi@us-east.connect.psdb.cloud/grant_tracking?ssl={"rejectUnauthorized":true}'
const connection = await mysql.createConnection(DATABASE_URL)

// get all data from the table
app.get('/get_all', async (req, res) => {
  let status = 200
  let retVal = {}
  try {
    const query = 'SELECT * FROM transactions'
    const [rows] = await connection.query(query)
    retVal.data = rows
  } catch (err) {
    console.error(err)
    retVal.message = 'Fail to get all the transactions'
  } finally {
    res.status(status).json(retVal)
  }
})

// end the connection
connection.end()