import express from "express";
import dotenv from "dotenv";
import mySqlPool from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

// Cấu hình dotenv
dotenv.config();

// rest object
const app = express();

// CORS
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json());

// Lấy port và hostname từ biến môi trường
const port = process.env.APP_PORT || 8999;
const hostname = process.env.APP_HOSTNAME || 'localhost';

// Routes
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);

// MySQL Connection
mySqlPool
    .query('SHOW DATABASES')
    .then(async () => {
        await console.log(`DATABASE CONNECTED SUCCESS...`);
        await app.listen(port, () => {
            console.log(`APP IS RUNNING ON http://${hostname}:${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
