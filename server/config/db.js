import mysql2 from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config()

const DB_HOSTNAME = process.env.DB_HOSTNAME;

const DB_PORT = process.env.DB_PORT;

const DB_USERNAME = process.env.DB_USERNAME;

const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_DATABASE = process.env.DB_DATABASE;


const mySqlPool = mysql2.createPool({
    host: DB_HOSTNAME,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE

})

export default mySqlPool