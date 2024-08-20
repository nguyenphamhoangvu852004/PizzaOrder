import express from "express";
import dotenv from "dotenv"
import mySqlPool from "./config/db.js";
import router from "./routes/productRoutes.js"
import cors from "cors"
//rest object
const app = express()

//config dotenv
dotenv.config()

//declare port and hostnme
const port = process.env.APP_PORT || 8999
const hostname = process.env.APP_HOSTNAME

//CORS
app.use(cors({
    origin: 'http://localhost:8080'
}));

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


//routes
app.use('/api/v1/product', router)

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

