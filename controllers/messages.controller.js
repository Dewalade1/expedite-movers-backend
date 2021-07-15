const { body, validationResult} = require("express-validator");

const messagesService = require("../services/messages.service");

exports.sendMessage = (req, res, next) => {
    const data = {}
    messagesService.sendMessage(data, (error, results) => {
        return(
            res.status(200).send({
                success: true,
                data: results
            })
        )
    })
}