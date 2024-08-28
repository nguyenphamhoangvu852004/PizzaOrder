import express from "express";
import dotenv from "dotenv"
import mySqlPool from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// CORS configuration
const allowedOrigins = ['http://localhost:8080', 'https://nguyenphamhoangvu.id.vn'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Port and hostname configuration
const port = process.env.APP_PORT || 8999
const hostname = process.env.APP_HOSTNAME

// Routes
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)

// Database connection and server start
mySqlPool
    .query('SHOW DATABASES')
    .then(async () => {
        console.log(`DATABASE CONNECTED SUCCESSFULLY...`)
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