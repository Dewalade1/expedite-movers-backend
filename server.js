require("dotenv").config({path: './.env'})

const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")

const mainRoute = require("./routes/main.route")

const app = express()

const port = process.env.PORT || 8080;

app.use(bodyParser.json())

app.use('/', mainRoute)

app.listen(port, () => {
    console.log("\n[*] Starting Expeditemovers server...")
    console.log("[*] Setting up dependencies...")
    console.log("[*] Setting up server config...")
    console.log("[+] Expeditemovers server is now live")
    console.log(`[+] Server runnung on port ${port}`)
})
