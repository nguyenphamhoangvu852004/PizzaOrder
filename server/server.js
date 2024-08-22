import express from "express";
import dotenv from "dotenv"
import mySqlPool from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

//rest object
const app = express()
//CORS
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json());
//config dotenv
dotenv.config()

//declare port and hostnme
const port = process.env.APP_PORT || 8999
const hostname = process.env.APP_HOSTNAME


app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


//routes
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)

//MySQL Connection
mySqlPool
    .query('SELECT * from Products')
    .then(async () => {
        await console.log(`DATABASE CONNECTED SUCCCESS...`)
        await app.listen(port, () => {
            console.log(`APP IS RUNNING ON http://${hostname}:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

