const express = require("express");
const { body, validationResult } = require("express-validator");

const messagesController = require("../controllers/messages.controller");

const router = express.Router()

router.post("/send-message-to-email", messagesController.validate('sendMessageToEmail'), messagesController.sendMessageToEmail)


module.exports = router;