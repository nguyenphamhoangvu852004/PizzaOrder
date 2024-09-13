import express from "express";
import dotenv from "dotenv"
import mySqlPool from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import cors from "cors"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// CORS configuration
const allowedOrigins = [
    'http://localhost:8080',
    'https://nguyenphamhoangvu.id.vn',
    'https://pizzaorder-2rtb.onrender.com'
];

// config Cors
app.use(cors())

// Middleware
app.use(express.json());

// Port and hostname configuration
const port = process.env.APP_PORT || 8999
const hostname = process.env.APP_HOSTNAME

// Routes
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/user/cart', cartRoutes)

// Database connection and server start
mySqlPool
    .query(`SHOW DATABASES LIKE '${process.env.DB_DATABASE}'`)
    .then(async () => {
        console.log(`DATABASE ${process.env.DB_DATABASE} CONNECTED SUCCESSFULLY...`)
        app.listen(port, () => {
            console.log(`APP IS RUNNING ON http://${hostname}:${port}`)
        })
    })
    .catch((error) => {
        console.error('Database connection error:', error)
        process.exit(1)
    })

// Error handling for CORS
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({
            message: 'CORS policy violation'
        });
    } else {
        next(err);
    }
});