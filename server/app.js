import dotenv from "dotenv"
import { dbConnection } from "./db/conn.js"

import express from "express"
import cors from "cors"

import router from "./Routes/router.js"

import path from "path"
import { fileURLToPath } from 'url'



dotenv.config({ path: "./.env" })
dbConnection()

const app = express()

console.log("import meta url ==>", import.meta.url)
console.log("cw --directory where node process started==>", process.cwd())

const __filename = fileURLToPath(import.meta.url); // get the  path of the file
const __dirname = path.dirname(__filename); // get the name of the directory of that file
console.log("folder/directory of this file ==>", __dirname)
console.log("absolute path to this file ==>", __filename)

console.log("import.meta.filename", import.meta.filename)
console.log("import.meta.dirname", import.meta.dirname)

app.use(cors())// allows  requests, from another domain, protocol, or port
app.use(express.json()) //parses incoming requests with JSON payload.

app.use("/uploads", express.static('./uploads'))//argument you pass into express.static() is the name of the directory you want Express to serve files.
app.use("/csv/files", express.static("./csv/files"))

app.use(router)

// or :-> true then stop, false then go
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running at : ", process.env.PORT || 3001)
})


