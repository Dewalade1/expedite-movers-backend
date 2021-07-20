const { body, validationResult} = require("express-validator");

const messagesService = require("../services/messages.service");

const Delivery = require('../models/deliveryTemplate');

exports.sendMessageToEmail = (req, res, next) => {

    const data = {
        name: "req.body.name",
        email: "req.body.email",
        message: "req.body.message"
    }

    const emails = [
        {
            to: ['Olubowale Ade-Onojobi <adewalade@gmail.com>'],
            from: 'noreply@expeditemoversng.com',
            templateId: 'd-fbc401c7877e467a810ceb678a220caf',
            dynamicTemplateData: {
                    "receiver": {
                    "firstName": "Team",
                    "lastName": "Support",
                    "email": "contact@expeditemoversng.com" 
                },
                    "contact": {
                    "name": "Dewalade",
                    "email": "adewalade@gmail.com",
                    "message": "Hello, Do you do dropshipping"
                },
            },
        },
        // {
            // to: 'adewalade@gmail.com', // send different emails to multiple people
            // from: 'noreply@expeditemoversng.com',
            // subject: `We got a new message`,
            // text: 'New message Received',
            // html: Delivery.html,
        // },
    ]

    messagesService.sendMessageToEmail(emails, (error, results) => {

        if (error) {
            return res.status(400).send({
                success: false,
                data: null,
                errors: error
            })
        }

        return(
            res.status(200).send({
                success: true,
                data: results
            })
        )
    })
}