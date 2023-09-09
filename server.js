require("dotenv").config({path: './.env'})

const cors = require("cors")
const express = require("express")
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
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

moesifExpress(options).startCaptureOutgoing();
app.use(moesifExpress(options)); 

Sentry.init({
  autoSessionTracking: true,
  dsn: "https://acad0aeb38ca4f4cba58ffa0d388c2e4@o471166.ingest.sentry.io/5888348",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  release: "expeditemoversng@" + process.env.npm_package_version,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.json())

app.use('/', mainRoute)

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => {
    console.log("\n[*] Starting Expeditemovers server...")
    console.log("[*] Setting up dependencies...")
    console.log("[*] Setting up server config...")
    console.log("[+] Expeditemovers server is now live")
    console.log(`[+] Server running on port ${port}`)
})
