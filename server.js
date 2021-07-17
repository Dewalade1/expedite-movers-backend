require("dotenv").config({path: './.env'})

const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const moesifExpress = require('moesif-express');

const mainRoute = require("./routes/main.route")

const app = express()

const port = process.env.PORT || 8080;

const options = {

  applicationId: process.env.MOESIF_APPLICATION_ID,

  identifyUser: function (req, res) {
    if (req.user) {
      return req.user.id;
    }
    return undefined;
  },

  getSessionToken: function (req, res) {
    return req.headers['Authorization'];
  }
};

app.use(moesifExpress(options));

app.use(bodyParser.json())

app.use('/', mainRoute)

app.listen(port, () => {
    console.log("\n[*] Starting Expeditemovers server...")
    console.log("[*] Setting up dependencies...")
    console.log("[*] Setting up server config...")
    console.log("[+] Expeditemovers server is now live")
    console.log(`[+] Server runnung on port ${port}`)
})
