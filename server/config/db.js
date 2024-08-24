import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

// Tạo kết nối đến MySQL
const mySqlPool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

export default mySqlPool;
