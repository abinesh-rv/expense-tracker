import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyparser from "body-parser"
import TransactionApi from "./routes/transactionsApi.js"
import UserApi from "./routes/userApi.js"
import connect from "./database/mongodb.js"

import * as dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5500

app.use(cors())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json())
app.use("/transactions",TransactionApi)
app.use("/auth",UserApi)


await connect()

app.listen(PORT)