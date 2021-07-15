const express = require("express");
const expressValidator = require("express-validator");

const router = express.Router()

router.get('/', (req, res, next) => {
    return res.status(200).send("Welcome to the backend of expeditemovers website")
})

module.exports = router;