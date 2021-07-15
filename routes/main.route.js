const express = require("express");

const messagesRoute = require("./messages.route");

const router = express.Router()

router.get('/', (req, res, next) => {
    return res.status(200).send("Welcome to the backend of expeditemovers website")
})

router.use('/messages', messagesRoute)

module.exports = router;