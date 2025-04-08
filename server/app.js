import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import { dbConnection } from "./db/conn.js"
import express from "express"
import cors from "cors"
import router from "./Routes/index.js"
import path from "path"
import { fileURLToPath } from 'url'
import rateLimit from "express-rate-limit"
// cron job
// import cron from "node-cron"
// import { mail } from "./Controllers/sendEmail.js"

dbConnection()
const app = express()

// rate limiting : securing api's
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,//within 1 min
    max: 50,//50 reqs
    handler: function(req, res) {
      res.status(429).json("Too many requests!");
    },
});

app.use(limiter);

console.log("import meta url ==> ", import.meta.url)
console.log("cw --directory where node process started ==> ", process.cwd())//server

const __filename = fileURLToPath(import.meta.url); // get the  path of the file
console.log("absolute path to this file ==> ", __filename)

const __dirname = path.dirname(__filename); // get the name of the directory of that file
console.log("folder/directory of this file ==> ", __dirname)
///////////////////////////or shortcut //////////////////////////////////////
console.log("import.meta.filename", import.meta.filename)
console.log("import.meta.dirname", import.meta.dirname)

app.use(cors())// allows  requests, from another domain, protocol, or port
app.use(express.json()) //parses incoming requests with JSON payload.

app.use("/uploads", express.static('./uploads'))
//argument you pass into express.static() is the name of the directory you want Express to serve files.
app.use("/csv/files", express.static("./csv/files"))

app.use("/api/v1", router)

// cron
// const task=()=>{

//   mail()
// }
// cron.schedule("* * * * *",task)


// or :-> true then stop, false then go
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running at : ", process.env.PORT || 3001)
})


