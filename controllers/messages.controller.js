const { body, validationResult} = require("express-validator");

const messagesService = require("../services/messages.service");

exports.sendMessageToEmail = (req, res, next) => {

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
                    "name": "req.body.name",
                    "email": "req.body.email",
                    "message": "req.body.message"
                },
            },
        },
        {
            to: 'Receiver Brown <adewalade@gmail.com>',  // send different emails to multiple people
            from: 'noreply@expeditemoversng.com',
            templateId: 'd-82ef6793262e4453a1690d367d8eba95',
            dynamicTemplateData: {
                "receiver": {
                    "firstName": "Reciever",
                    "lastName": "Brown",
                    "email": "adewalade@gmail.com" 
                },
            },
        },
    ]

    messagesService.sendMessageToEmail(emails, (error, results) => {

        if ( error )   {
            return res.status(400).send({
                success: false,
                data: null,
                errors: error
            })
        }

        return(
            res.status(200).send({
                success: true,
                data: results,
                errors: error
            })
        )
    })
}