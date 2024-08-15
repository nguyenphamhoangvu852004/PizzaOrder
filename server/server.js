import express from "express";
import dotenv from "dotenv"
import mySqlPool from "./config/db.js";
import router from "./routes/productRoutes.js"
//rest object
const app = express()

//config dotenv
dotenv.config()

//routes
app.use('/api/v1/product', router)

//port
const port = process.env.APP_PORT || 8999

const hostname = process.env.APP_HOSTNAME

mySqlPool
    .query('SELECT * FROM products')
    .then(async () => {
        await console.log(`DATABASE CONNECTED SUCCCESS...`)
        await app.listen(port, () => {
            console.log(`APP IS RUNNING ON https://${hostname}:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

